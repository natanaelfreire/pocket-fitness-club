import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { PersonCircle } from '@styled-icons/bootstrap/PersonCircle';
import { PlusSquare } from '@styled-icons/bootstrap/PlusSquare';

import { Table } from "../../components/Table";
import { getClienteById } from "../../services/ClienteService";
import { useEffect, useState } from "react";
import { formataTelefone } from "../../utils/formataTelefone";
import { formataCPF } from "../../utils/formataCPF";
import { getAgendamentosPorCliente, getRecebimentosPorCliente } from "../../services/ClienteDetalhesService";
import { formataData, formataDataHora } from "../../utils/formataData";

type Cliente = {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  dataMensalidade: string;
  valorMensalidade: number;
  ativo: boolean;
}

type AgendamentoCliente = {
  id: number;
  dataHora: string;
  professor: string;
  modalidade: string;
}

type RecebimentoCliente = {
  id: number;
  dataRecebimento: string;
  valor: number;
  referencia: string;
}

export function ClienteDetalhes() {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente>({} as Cliente);
  const [agendamentos, setAgendamentos] = useState<AgendamentoCliente[]>();
  const [recebs, setRecebs] = useState<RecebimentoCliente[]>();

  const carregaDadosCliente = async () => {
    const response = await getClienteById(String(id));

    if (response.sucesso) {
      setCliente(response.data);
    }

    if (id) {
      const agendamets = await getAgendamentosPorCliente(id);

      if (agendamets.sucesso) {
        setAgendamentos(agendamets.data);
      }

      const recebs = await getRecebimentosPorCliente(id);

      if (recebs.sucesso) {
        setRecebs(recebs.data);
      }
    }
  }

  useEffect(() => {
    carregaDadosCliente()
  }, [])

  return (
    <>
      <Helmet title='Detalhes - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Cliente Detalhes</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <Link className="hover:underline hover:underline-offset-1" to="/cliente">Clientes</Link> / <span className="underline underline-offset-1">Detalhes</span>
        </small>
      </div>

      <div className="card w-full mb-5 lg:flex lg:justify-between">
        <div className="flex items-center gap-5 w-80">
          <PersonCircle size={70} color="gray" />
          <div>
            <h3 className="text-xl mb-1">{cliente.nome}</h3>
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full">
              </div>
              <div>
                <span className="text-green-600 font-semibold">Ativo</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg mb-1">Contato:</h4>
          <span>{formataTelefone(cliente.telefone)}</span>
        </div>

        <div>
          <h4 className="text-lg mb-1">CPF:</h4>
          <span>{formataCPF(cliente.cpf)}</span>
        </div>
      </div>

      <div className="lg:flex lg:gap-5">
        <div className="card w-full lg:w-2/5 mb-5">
          <div className="flex justify-between items-start">
            <h4 className='card-title'>Histórico de pagamentos</h4>
            <button><PlusSquare color="green" size={30} /></button>
          </div>

          <Table
            items={recebs ?? []}
            columns={
              [
                {
                  head: 'Data',
                  renderItem: (item) => {
                    return formataData(item.dataRecebimento);
                  }
                },
                {
                  head: 'Valor',
                  renderItem: (item) => {
                    return item.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                  }
                },
                {
                  head: 'Referência',
                  renderItem: (item) => {
                    return item.referencia;
                  }
                }
              ]
            }
          />
        </div>

        <div className="card w-full lg:w-2/5 mb-5">
          <div className="flex justify-between items-start">
            <h4 className='card-title'>Histórico de agendamentos</h4>
            <button><PlusSquare color="green" size={30} /></button>
          </div>

          <Table
            items={agendamentos ?? []}
            columns={
              [
                {
                  head: 'Data/Horário',
                  renderItem: (item) => {
                    return formataDataHora(item.dataHora);
                  }
                },
                {
                  head: 'Professor',
                  renderItem: (item) => {
                    return item.professor;
                  }
                },
                {
                  head: 'Modalidade',
                  renderItem: (item) => {
                    return item.modalidade;
                  }
                }
              ]
            }
          />
        </div>

        <div className="card w-full lg:w-1/5 mb-5">
          <div className="flex justify-between items-start">
            <h4 className='card-title'>Fichas de treino</h4>
            <button><PlusSquare color="green" size={30} /></button>
          </div>

          <Table
            items={[]}
            columns={
              [
                {
                  head: 'Modalidade',
                  renderItem: (item) => {
                    return 'Modalidade'
                  }
                },
                {
                  head: 'Ficha',
                  renderItem: (item) => {
                    return 'Ficha'
                  }
                }
              ]
            }
          />
        </div>
      </div>
    </>
  );
}