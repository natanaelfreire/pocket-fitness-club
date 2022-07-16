import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Edit } from '@styled-icons/boxicons-solid/Edit';
import { Trash } from '@styled-icons/boxicons-regular/Trash';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Form/Input";
import {
  getProfessores,
  getProfessorById,
  atualizarProfessor,
  criarProfessor,
  excluirProfessor
} from "../../services/ProfessorService";
import { formataCPF } from "../../utils/formataCPF";
import { formataTelefone } from "../../utils/formataTelefone";

import { useQueryClient } from "react-query";

export function Professor() {
  const { professores, isFetchingProfessores, errorProfessores } = getProfessores();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idProfessor, setIdProfessor] = useState<string | null>(null);

  const [inputNome, setInputNome] = useState('');
  const [inputCPF, setInputCPF] = useState('');
  const [inputEndereco, setInputEndereco] = useState('');
  const [inputTelefone, setInputTelefone] = useState('');
  const [inputEspecialidade, setInputEspecialidade] = useState('');
  const [inputFormacao, setInputFormacao] = useState('');

  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const handleOpenModal = async (id?: string) => {
    if (id) {
      const response = await getProfessorById(id);

      if (response.sucesso) {
        setIdProfessor(response.data.id);
        setInputNome(response.data.nome);
        setInputCPF(response.data.cpf);
        setInputEndereco(response.data.endereco);
        setInputTelefone(response.data.telefone);
        setInputEspecialidade(response.data.especialidade);
        setInputFormacao(response.data.formacao);
        setModalIsOpen(true);

      } else {
        alert(response.mensagem);
      }
    } else {
      setIdProfessor(null);
      setInputNome('');
      setInputCPF('');
      setInputEndereco('');
      setInputTelefone('');
      setInputEspecialidade('');
      setInputFormacao('');
      setModalIsOpen(true);
    }
  }

  const handleSalvarProfessor = async () => {
    if (idProfessor) {
      const response = await atualizarProfessor({
        id: idProfessor,
        nome: inputNome,
        cpf: inputCPF,
        endereco: inputEndereco,
        telefone: inputTelefone,
        especialidade: inputEspecialidade,
        formacao: inputFormacao,
        cargo: 'Professor'
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Professor editado!',
          text: 'Cadastro editado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('professores');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }

    } else {
      const response = await criarProfessor({
        nome: inputNome,
        cpf: inputCPF,
        endereco: inputEndereco,
        telefone: inputTelefone,
        especialidade: inputEspecialidade,
        formacao: inputFormacao,
        cargo: 'Professor'
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Professor cadastrado!',
          text: 'Cadastro realizado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('professores');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }
    }
  }

  const handleExcluirProfessor = async (id: string, descricao: string) => {
    await MySwal.fire({
      title: 'Você tem certeza?',
      html: <p>Deseja excluir permanentemente o registro <b>{descricao}</b></p>,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await excluirProfessor(id);

        if (response.sucesso) {
          Swal.fire({
            title: 'Excluído!',
            text: 'Registro excluído com sucesso.',
            showConfirmButton: false,
            icon: 'success',
            timer: 1500
          })

          queryClient.invalidateQueries('professores');

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
      <Helmet title='Professores - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Professores</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Professores</span>
        </small>
      </div>

      <div className="card">
        <div className="flex justify-between items-start">
          <h4 className="card-title">Professores cadastrados</h4>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex justify-center bg-blue-500 px-5 py-2 text-white font-semibold hover:bg-blue-600 focus:bg-blue-700 transition-colors rounded-md focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white outline-none"
          >
            Adicionar
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table
            items={professores ?? []}
            loading={isFetchingProfessores}
            columns={[
              {
                head: 'Nome',
                renderItem: (item) => {
                  return (
                    <div className="flex flex-col gap-1">
                      <p>{item.nome}</p>
                      <span
                        className="bg-gray-200 py-1 px-2 text-xs self-start text-black rounded-md"
                      >
                        {formataCPF(item.cpf)}
                      </span>
                    </div>
                  );
                }
              },
              {
                head: 'Endereço',
                renderItem: (item) => {
                  return item.endereco;
                }
              },
              {
                head: 'Contato',
                renderItem: (item) => {
                  return formataTelefone(item.telefone);
                }
              },
              {
                head: 'Formação/Especialidade',
                renderItem: (item) => {
                  return `${item.formacao} - ${item.especialidade}`;
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
                        onClick={() => handleExcluirProfessor(item.id, item.nome)}
                        title="Excluir"
                        className="bg-rose-100 rounded-full p-1 flex justify-center items-center hover:bg-rose-200 focus:ring-2 focus:ring-rose-100 text-rose-500"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  );
                }
              }
            ]}
          />
        </div>
      </div>

      <Modal
        title="Professor"
        open={modalIsOpen}
        id={'Edição'}
        setIsOpen={setModalIsOpen}
        onConfirm={handleSalvarProfessor}
      >
        <Input
          type="text"
          label="Nome"
          setInput={setInputNome}
          value={inputNome}
        />

        <Input
          type="text"
          label="CPF"
          setInput={setInputCPF}
          value={inputCPF}
        />

        <Input
          type="text"
          label="Endereço"
          setInput={setInputEndereco}
          value={inputEndereco}
        />

        <Input
          type="text"
          label="Telefone"
          setInput={setInputTelefone}
          value={inputTelefone}
        />

        <div className="lg:flex lg:gap-5">
          <Input
            type="text"
            label="Especialidade"
            setInput={setInputEspecialidade}
            value={inputEspecialidade}
          />

          <Input
            type="text"
            label="Formação"
            setInput={setInputFormacao}
            value={inputFormacao}
          />
        </div>
      </Modal>
    </>
  );
}