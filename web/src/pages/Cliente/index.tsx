import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as Dropdown, Transition } from '@headlessui/react'
import { DotsVerticalRounded } from '@styled-icons/boxicons-regular/DotsVerticalRounded';
import { useQueryClient } from 'react-query';

import { Table } from '../../components/Table';
import { Input } from '../../components/Form/Input';
import { CPFInput } from '../../components/Form/CPFInput';
import { Checkbox } from '../../components/Form/Checkbox';
import { PhoneInput } from '../../components/Form/PhoneInput';
import { GenericSelect } from '../../components/Form/GenericSelect';
import { Modal } from '../../components/Modal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { formataCPF } from '../../utils/formataCPF';
import { formataTelefone } from '../../utils/formataTelefone';

import {
  getClientes,
  atualizarCliente,
  criarCliente,
  excluirCliente,
  getClienteById
} from '../../services/ClienteService';

export function Cliente() {
  const [filtroClienteId, setFiltroClienteId] = useState('');
  const [filtroCPF, setFiltroCPF] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  const { clientes, isFetchingClientes, errorClientes, refetch } = getClientes(filtroClienteId, filtroCPF, filtroStatus);

  if (errorClientes)
    alert(errorClientes.message);

  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [inputNome, setInputNome] = useState('');
  const [inputCPF, setInputCPF] = useState('');
  const [inputDataNascimento, setInputDataNascimento] = useState('');
  const [inputEndereco, setInputEndereco] = useState('');
  const [inputTelefone, setInputTelefone] = useState('');
  const [inputDataMensalidade, setInputDataMensalidade] = useState('');
  const [inputValorMensalidade, setInputValorMensalidade] = useState('');
  const [inputAtivo, setInputAtivo] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idCliente, setIdCliente] = useState<string | null>(null);

  const handleOpenModal = async (id?: string) => {
    if (id) {
      const response = await getClienteById(id);

      if (response.sucesso) {
        setIdCliente(response.data.id);
        setInputNome(response.data.nome);
        setInputCPF(response.data.cpf);
        setInputDataNascimento(response.data.dataNascimento.split('T')[0]);
        setInputEndereco(response.data.endereco);
        setInputTelefone(response.data.telefone);
        setInputDataMensalidade(response.data.dataMensalidade.split('T')[0]);
        setInputValorMensalidade(response.data.valorMensalidade);
        setInputAtivo(response.data.ativo);

        setModalIsOpen(true);

      } else {
        alert(response.mensagem);
      }
    } else {
        setIdCliente(null);
        setInputNome('');
        setInputCPF('');
        setInputDataNascimento('');
        setInputEndereco('');
        setInputTelefone('');
        setInputDataMensalidade('');
        setInputValorMensalidade('');
        setInputAtivo(true);

        setModalIsOpen(true);
    }
  }

  const handleSalvarCliente = async () => {
    if (idCliente) {
      console.log({
        id: idCliente,
        nome: inputNome,
        cpf: inputCPF,
        dataNascimento: inputDataNascimento.split('/').reverse().join('-'),
        endereco: inputEndereco,
        telefone: inputTelefone,
        dataMensalidade: inputDataMensalidade.split('/').reverse().join('-'),
        valorMensalidade: parseFloat(inputValorMensalidade),
        ativo: inputAtivo
      });


      
      const response = await atualizarCliente({
        id: idCliente,
        nome: inputNome,
        cpf: inputCPF,
        dataNascimento: inputDataNascimento.split('/').reverse().join('-'),
        endereco: inputEndereco,
        telefone: inputTelefone,
        dataMensalidade: inputDataMensalidade.split('/').reverse().join('-'),
        valorMensalidade: parseFloat(inputValorMensalidade),
        ativo: inputAtivo
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Cliente editado!',
          text: 'Cadastro editado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('clientes');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }

    } else {
      const response = await criarCliente({
        nome: inputNome,
        cpf: inputCPF,
        dataNascimento: inputDataNascimento.split('/').reverse().join('-'),
        endereco: inputEndereco,
        telefone: inputTelefone,
        dataMensalidade: inputDataMensalidade.split('/').reverse().join('-'),
        valorMensalidade: parseFloat(inputValorMensalidade),
        ativo: inputAtivo
      })

      if (response.sucesso) {
        MySwal.fire({
          title: 'Cliente cadastrado!',
          text: 'Cadastro realizado com sucesso.',
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        })

        queryClient.invalidateQueries('clientes');
        setModalIsOpen(false);

      } else {
        alert(response.mensagem);
      }
    }
  }

  const handleExcluirCliente = async (id: string, descricao: string) => {
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
        const response = await excluirCliente(id);

        if (response.sucesso) {
          Swal.fire({
            title: 'Excluído!',
            text: 'Registro excluído com sucesso.',
            showConfirmButton: false,
            icon: 'success',
            timer: 1500
          })

          queryClient.invalidateQueries('clientes');

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
      <Helmet title='Clientes - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Clientes</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Clientes</span>
        </small>
      </div>

      <div className='card mb-5'>
        <h4 className='card-title'>Filtros</h4>

        <div className='lg:flex lg:gap-5'>
          <div className='w-full mb-3 lg:w-3/3 lg:mb-0'>
            <GenericSelect
              name="Cliente"
              options={clientes ?? []}
              label="nome"
              value='id'
              setInput={setFiltroClienteId}
              selected={filtroClienteId}
              loading={isFetchingClientes}
            />
          </div>

          <div className='w-full mb-3 lg:w-2/3 lg:mb-0'>
            <CPFInput
              label='CPF'
              setInput={setFiltroCPF}
              value={filtroCPF}
            />
          </div>

          <div className='w-full mb-3 lg:w-2/3 lg:mb-0'>
            <GenericSelect
              name="Status"
              options={[
                {
                  id: "ATIVO",
                  descricao: "Ativo"
                },
                {
                  id: "INATIVO",
                  descricao: "Inativo"
                }
              ]}
              label="descricao"
              value='id'
              setInput={setFiltroStatus}
              selected={filtroStatus}
            />
          </div>

          <div className='w-full mb-3 lg:w-1/4 lg:mb-0 flex justify-end items-center'>
            <button
              onClick={() => refetch()}
              className='inline-flex justify-center lg:mt-3 bg-blue-500 px-5 py-2 text-white font-semibold hover:bg-blue-600 focus:bg-blue-700 transition-colors rounded-md focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white outline-none'
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-start">
          <h4 className="card-title">Clientes cadastrados</h4>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex justify-center bg-blue-500 px-5 py-2 text-white font-semibold hover:bg-blue-600 focus:bg-blue-700 transition-colors rounded-md focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white outline-none"
          >
            Adicionar
          </button>
        </div>

        <div className="overflow-x-auto sm:overflow-x-visible">
          <Table
            items={clientes ?? []}
            loading={isFetchingClientes}
            columns={[
              {
                head: 'Nome',
                renderItem: (item) => {
                  return (
                    <div className="flex flex-col gap-1">
                      <p>{item.nome.toUpperCase()}</p>
                      <div className="flex items-start">
                        <span
                          className="bg-gray-400 inline-block px-1 py-0.5 text-xs self-start text-white font-semibold rounded-sm whitespace-nowrap"
                        >
                          {formataCPF(item.cpf)}
                        </span>

                        <svg height="25" width="25">
                          <circle cx="15" cy="10" r="6" stroke="none" stroke-width="3" fill={item.ativo ? 'green' : 'red'} />
                        </svg>
                        <span
                          className={`font-semibold ${item.ativo ? 'text-green-700' : 'text-rose-700'}`}
                        >
                          {item.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  )
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
                head: 'Venc. mensalidade',
                renderItem: (item) => {
                  return new Date(item.dataMensalidade.split('.')[0]).toLocaleDateString('pt-BR', );
                }
              },
              {
                head: 'Valor mensalidade',
                renderItem: (item) => {
                  return item.valorMensalidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                }
              },
              {
                head: 'Ações',
                renderItem: (item) => {
                  return (
                    <div className=''>
                      <Dropdown>
                        <Dropdown.Button className='rounded-xl flex items-center justify-center border px-1 py-3 hover:bg-blue-500 hover:text-white transition-colors'>
                          <DotsVerticalRounded size={20} />
                        </Dropdown.Button>

                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Dropdown.Items className="absolute right-0 mt-2 w-auto rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg flex flex-col">
                            <Dropdown.Item>
                              <a
                                className='text-black whitespace-nowrap dark:text-zinc-300 text-xs flex items-center gap-2 hover:bg-blue-500 dark:hover:bg-zinc-900 hover:text-white p-2 m-1 rounded-md'
                                href="#"
                                onClick={() => {}}
                              >
                                Receber Mensalidade
                              </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link
                                className='text-black whitespace-nowrap dark:text-zinc-300 text-xs flex items-center gap-2 hover:bg-blue-500 dark:hover:bg-zinc-900 hover:text-white p-2 m-1 rounded-md'
                                to={`detalhes/${item.id}`}
                              >
                                Ver Detalhes
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <a
                                className='text-black whitespace-nowrap dark:text-zinc-300 text-xs flex items-center gap-2 hover:bg-blue-500 dark:hover:bg-zinc-900 hover:text-white p-2 m-1 rounded-md'
                                href="#"
                                onClick={() => handleOpenModal(item.id)}
                              >
                                Editar
                              </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <a
                                className='text-black whitespace-nowrap dark:text-zinc-300 text-xs flex items-center gap-2 hover:bg-blue-500 dark:hover:bg-zinc-900 hover:text-white p-2 m-1 rounded-md'
                                href="#"
                                onClick={() => handleExcluirCliente(item.id, item.nome)}
                              >
                                Excluir
                              </a>
                            </Dropdown.Item>
                          </Dropdown.Items>
                        </Transition>
                      </Dropdown>
                    </div>
                  );
                }
              }
            ]}
          />
        </div>
      </div>

      <Modal
        title="Clientes"
        open={modalIsOpen}
        id={idCliente ? 'Edição' : null}
        setIsOpen={setModalIsOpen}
        onConfirm={handleSalvarCliente}
      >
        <Input
          type="text"
          label="Nome"
          setInput={setInputNome}
          value={inputNome}
        />

        <div className="lg:flex lg:gap-5">
          <CPFInput
            label="CPF"
            setInput={setInputCPF}
            value={inputCPF}
          />

          <Input
            type="date"
            label="Data nascimento"
            setInput={setInputDataNascimento}
            value={inputDataNascimento}
          />
        </div>

        <Input
          type="text"
          label="Endereço"
          setInput={setInputEndereco}
          value={inputEndereco}
        />

        <PhoneInput
          label="Celular"
          setInput={setInputTelefone}
          value={inputTelefone}
        />

        <div className="lg:flex lg:gap-5">
          <Input
            type="date"
            label="Data mensalidade"
            setInput={setInputDataMensalidade}
            value={inputDataMensalidade}
          />

          <Input
            type="number"
            label="Valor mensalidade"
            setInput={setInputValorMensalidade}
            value={inputValorMensalidade}
          />          
        </div>

        <Checkbox
            label='Ativo'
            enabled={inputAtivo}
            setEnabled={setInputAtivo}
          />
      </Modal>
    </>
  )
}