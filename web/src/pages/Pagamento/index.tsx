import { useState } from "react";
import { Helmet } from "react-helmet";
import { Edit } from '@styled-icons/boxicons-solid/Edit';
import { Trash } from '@styled-icons/boxicons-regular/Trash';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Link } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import { Modal } from "../../components/Modal";
import { Table } from "../../components/Table";

import {
  getPagamentoById,
  atualizarPagamento,
  criarPagamento,
  excluirPagamento,
  getPagamentos
} from "../../services/PagamentoService";
import { formataData } from "../../utils/formataData";
import { useQueryClient } from "react-query";

export function Pagamento() {
  const { pagamentos, isFetchingPagamentos, errorPagamentos } = getPagamentos();

  const [inputDescricao, setInputDescricao] = useState('');
  const [inputDataPagamento, setInputDataPagamento] = useState('');
  const [inputValor, setInputValor] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idPagamento, setIdPagamento] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const handleOpenModal = async (id?: number) => {
    if (id) {
      const response = await getPagamentoById(id);

      setIdPagamento(response.data.id);
      setInputDescricao(response.data.descricao);
      setInputDataPagamento(String(response.data.dataPagamento).split('T')[0]);
      setInputValor(response.data.valor);

      setModalIsOpen(true);

    } else {
      setIdPagamento(null);
      setInputDescricao('');
      setInputDataPagamento(new Date().toISOString().split('T')[0]);
      setInputValor('');

      setModalIsOpen(true);
    }
  }

  const handleSalvarPagamento = async () => {
    if (idPagamento) {
      const response = await atualizarPagamento({
        id: idPagamento,
        descricao: inputDescricao,
        dataPagamento: inputDataPagamento,
        valor: parseFloat(inputValor)
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Pagamento editado!',
          text: 'Cadastro editado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('pagamentos');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }

    } else {
      const response = await criarPagamento({
        descricao: inputDescricao,
        dataPagamento: inputDataPagamento,
        valor: parseFloat(inputValor),
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Pagamento cadastrado!',
          text: 'Cadastro realizado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('pagamentos');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }
    }
  }

  const handleExcluirPagamento = async (id: number, descricao: string) => {
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
        const response = await excluirPagamento(id);

        if (response.sucesso) {
          Swal.fire({
            title: 'Excluído!',
            text: 'Registro excluído com sucesso.',
            showConfirmButton: false,
            icon: 'success',
            timer: 1500
          })

          queryClient.invalidateQueries('pagamentos');

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
      <Helmet title='Pagamentos - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Pagamentos</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Pagamentos</span>
        </small>
      </div>

      <div className="card">
        <div className="flex justify-between items-start">
          <h4 className="card-title">Pagamentos cadastrados</h4>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex justify-center bg-blue-500 px-5 py-2 text-white font-semibold hover:bg-blue-600 focus:bg-blue-700 transition-colors rounded-md focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white outline-none"
          >
            Adicionar
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table
            items={pagamentos ?? []}
            loading={isFetchingPagamentos}
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
                head: 'Valor',
                renderItem: (item) => {
                  return item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                }
              },
              {
                head: 'Data pagamento',
                renderItem: (item) => {
                  return formataData(item.dataPagamento);
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
                        onClick={() => handleExcluirPagamento(item.id, item.descricao)}
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
        title="Pagamento"
        open={modalIsOpen}
        setIsOpen={setModalIsOpen}
        id={idPagamento}
        onConfirm={handleSalvarPagamento}
      >
        <Input
          label="Descrição"
          type="text"
          setInput={setInputDescricao}
          value={inputDescricao}
        />

        <div className="lg:flex lg:gap-5">
          <Input
            label="Data de Pagamento"
            type="date"
            setInput={setInputDataPagamento}
            value={inputDataPagamento}
          />
          <Input
            label="Valor"
            type="number"
            setInput={setInputValor}
            value={inputValor}
          />
        </div>
      </Modal>
    </>
  )
}