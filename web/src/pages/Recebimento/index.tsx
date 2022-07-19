import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { Edit } from '@styled-icons/boxicons-solid/Edit';
import { Trash } from '@styled-icons/boxicons-regular/Trash';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { GenericSelect } from "../../components/Form/GenericSelect";
import { Input } from "../../components/Form/Input";
import { Modal } from "../../components/Modal";
import { Table } from "../../components/Table";

import { getClientes } from "../../services/ClienteService";
import {
  getRecebimentos,
  criarRecebimento,
  atualizarRecebimento,
  excluirRecebimento,
  getRecebimentoById
} from "../../services/RecebimentoService";

import { formataData } from "../../utils/formataData";

export function Recebimento() {
  const { recebimentos, isFetchingRecebimentos, errorRecebimentos } = getRecebimentos();
  const { clientes, isFetchingClientes, errorClientes } = getClientes();

  const [inputDescricao, setInputDescricao] = useState('');
  const [clienteSelected, setClienteSelected] = useState('');
  const [inputDataRecebimento, setInputDataRecebimento] = useState('');
  const [inputValor, setInputValor] = useState('');
  const [referenciaSelected, setReferenciaSelected] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idRecebimento, setIdRecebimento] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const handleOpenModal = async (id?: number) => {
    if (id) {
      const response = await getRecebimentoById(id);

      setIdRecebimento(response.data.id);
      setInputDescricao(response.data.descricao);
      setClienteSelected(response.data.clienteId);
      setInputDataRecebimento(String(response.data.dataRecebimento).split('T')[0]);
      setInputValor(response.data.valor);
      setReferenciaSelected(response.data.referencia);

      setModalIsOpen(true);

    } else {
      setIdRecebimento(null);
      setInputDescricao('');
      setClienteSelected('');
      setInputDataRecebimento(new Date().toISOString().split('T')[0]);
      setInputValor('');
      setReferenciaSelected('');
      setModalIsOpen(true);
    }
  }

  const handleSalvarRecebimento = async () => {
    if (idRecebimento) {
      const response = await atualizarRecebimento({
        id: idRecebimento,
        descricao: inputDescricao,
        dataRecebimento: inputDataRecebimento,
        referencia: referenciaSelected,
        valor: parseFloat(inputValor),
        clienteId: clienteSelected
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Recebimento editado!',
          text: 'Cadastro editado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('recebimentos');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }

    } else {
      const response = await criarRecebimento({
        descricao: inputDescricao,
        dataRecebimento: inputDataRecebimento,
        referencia: referenciaSelected,
        valor: parseFloat(inputValor),
        clienteId: clienteSelected
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Recebimento cadastrado!',
          text: 'Cadastro realizado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('recebimentos');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }
    }
  }

  const handleExcluirRecebimento = async (id: number, descricao: string) => {
    await MySwal.fire({
      title: 'Você tem certeza?',
      html: <p>Deseja excluir permanentemente o registro <b>#{id} - {descricao}</b></p>,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await excluirRecebimento(id);

        if (response.sucesso) {
          Swal.fire({
            title: 'Excluído!',
            text: 'Registro excluído com sucesso.',
            showConfirmButton: false,
            icon: 'success',
            timer: 1500
          })

          queryClient.invalidateQueries('recebimentos');

        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            title: 'ERRO',
            text: response.mensagem,
            icon: 'error',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
        }
      }
    })
  }

  return (
    <>
      <Helmet title='Recebimentos - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Recebimentos</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Recebimentos</span>
        </small>
      </div>

      <div className="card">
        <div className="flex justify-between items-start">
          <h4 className="card-title">Recebimentos cadastrados</h4>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex justify-center bg-blue-500 px-5 py-2 text-white font-semibold hover:bg-blue-600 focus:bg-blue-700 transition-colors rounded-md focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white outline-none"
          >
            Adicionar
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table
            items={recebimentos ?? []}
            loading={isFetchingRecebimentos}
            columns={[
              {
                head: 'Id',
                renderItem: (item) => {
                  return item.id;
                }
              },
              {
                head: 'Descrição',
                renderItem: (item) => {
                  return item.descricao;
                }
              },
              {
                head: 'Cliente',
                renderItem: (item) => {
                  if (item.cliente)
                    return item.cliente.nome;
                  else
                    return "-";
                }
              },
              {
                head: 'Referência',
                renderItem: (item) => {
                  return item.referencia;
                }
              },
              {
                head: 'Valor',
                renderItem: (item) => {
                  return item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                }
              },
              {
                head: 'Data recebimento',
                renderItem: (item) => {
                  return formataData(item.dataRecebimento);
                }
              },
              {
                head: 'Ações',
                renderItem: (item) => {
                  return (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleOpenModal(item.id)}
                        title="Editar"
                        className="bg-orange-100 rounded-full p-1 flex justify-center items-center hover:bg-orange-200 focus:ring-2 focus:ring-orange-100"
                      >
                        <Edit color="orange" size={18} />
                      </button>
                      <button
                        onClick={() => handleExcluirRecebimento(item.id, item.descricao)}
                        title="Excluir"
                        className="bg-rose-100 rounded-full p-1 flex justify-center items-center hover:bg-rose-200 focus:ring-2 focus:ring-rose-100 text-rose-500"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  )
                }
              }
            ]}
          />
        </div>
      </div>

      <Modal
        title="Recebimento"
        open={modalIsOpen}
        setIsOpen={setModalIsOpen}
        id={idRecebimento}
        onConfirm={handleSalvarRecebimento}
      >
        <Input
          label="Descrição"
          type="text"
          setInput={setInputDescricao}
          value={inputDescricao}
        />

        <GenericSelect
          options={clientes ?? []}
          name="Cliente (opcional)"
          label="nome"
          value="id"
          setInput={setClienteSelected}
          selected={clienteSelected}
          loading={isFetchingClientes}
        />

        <div className="lg:flex lg:gap-5">
          <Input
            label="Data de Recebimento"
            type="date"
            setInput={setInputDataRecebimento}
            value={inputDataRecebimento}
          />
          <Input
            label="Valor"
            type="number"
            setInput={setInputValor}
            value={inputValor}
          />
        </div>

        <GenericSelect
          name="Referência"
          options={[
            {
              id: "MENSALIDADE",
              descricao: "Mensalidade"
            },
            {
              id: "VENDA",
              descricao: "Venda"
            },
            {
              id: "OUTROS",
              descricao: "Outros"
            }
          ]}
          label="descricao"
          value="id"
          setInput={setReferenciaSelected}
          selected={referenciaSelected}
        />
      </Modal>
    </>
  )
}