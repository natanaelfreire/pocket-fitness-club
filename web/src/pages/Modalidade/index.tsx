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
  getModalidades,
  getModalidadeById,
  criarModalidade,
  atualizarModalidade,
  excluirModalidade
} from "../../services/ModalidadeService";

import { useQueryClient } from "react-query";

type Modalidade = {
  id: number;
  descricao: string;
}

export function Modalidade() {
  const { modalidades, isFetchingModalidades, errorModalidades } = getModalidades();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputModalidade, setInputModalidade] = useState<string>('');
  const [idModalidade, setIdModalidade] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const handleOpenModal = async (id?: number) => {
    if (id) {
      const response = await getModalidadeById(id);

      if (response.sucesso) {
        setInputModalidade(response.data.descricao);
        setIdModalidade(response.data.id);
        setModalIsOpen(true);

      } else {
        alert(response.mensagem);
      }
    } else {
      setInputModalidade('');
      setIdModalidade(null);
      setModalIsOpen(true);
    }
  }

  const handleSalvarModalidade = async () => {
    if (idModalidade) {
      const response = await atualizarModalidade({
        id: idModalidade,
        descricao: inputModalidade
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Modalidade editada!',
          text: 'Cadastro editado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('modalidades');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }

    } else {
      const response = await criarModalidade({
        descricao: inputModalidade
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Modalidade cadastrada!',
          text: 'Cadastro realizado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('modalidades');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }
    }
  }

  const handleExcluirModalidade = async (id: number, descricao: string) => {
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
        const response = await excluirModalidade(id);

        if (response.sucesso) {
          Swal.fire({
            title: 'Excluído!',
            text: 'Registro excluído com sucesso.',
            showConfirmButton: false,
            icon: 'success',
            timer: 1500
          })

          queryClient.invalidateQueries('modalidades');

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
      <Helmet title='Modalidades - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Modalidades</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Modalidades</span>
        </small>
      </div>

      <div className="card">
        <div className="flex justify-between items-start">
          <h4 className="card-title">Modalidades cadastradas</h4>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex justify-center bg-blue-500 px-5 py-2 text-white font-semibold hover:bg-blue-600 focus:bg-blue-700 transition-colors rounded-md focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white outline-none"
          >
            Adicionar
          </button>
        </div>

        <Table
          items={modalidades ?? []}
          loading={isFetchingModalidades}
          columns={
            [
              {
                head: 'Id',
                renderItem: (item) => {
                  return <span>{item.id}</span>;
                }
              },
              {
                head: 'Descrição',
                renderItem: (item) => {
                  return item.descricao;
                }
              },
              {
                head: 'Ações',
                position: 'center',
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
                        onClick={() => handleExcluirModalidade(item.id, item.descricao)}
                        title="Excluir"
                        className="bg-rose-100 rounded-full p-1 flex justify-center items-center hover:bg-rose-200 focus:ring-2 focus:ring-rose-100 text-rose-500"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  )
                }
              }
            ]
          }
        />
      </div>

      <Modal
        title="Modalidade"
        open={modalIsOpen}
        id={idModalidade}
        setIsOpen={setModalIsOpen}
        onConfirm={handleSalvarModalidade}
      >
        <Input
          type="text"
          label="Descrição"
          setInput={setInputModalidade}
          value={inputModalidade}
        />
      </Modal>
    </>
  );
}