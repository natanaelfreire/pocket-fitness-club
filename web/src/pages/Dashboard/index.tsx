import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { People } from '@styled-icons/bootstrap/People';
import { CurrencyDollar } from '@styled-icons/bootstrap/CurrencyDollar';

import Chart from 'react-apexcharts';
import { 
  getAgendamentosPorDia, 
  getAtividades, 
  getQuantidadeClientes, 
  getReceitaMes, 
  modalidadesMaisPraticadas 
} from "../../services/DashboardService";

export function Dashboard() {
  const [receitaMes, setReceitaMes] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [atividades, setAtividades] = useState<{ descricao: string }[]>([]);
  const [agendamentosPorSemana, setAgendamentosPorSemana] = useState<number[]>([]);
  const [modalidadesPraticadas, setModalidadesPraticadas] = useState<{
    series: number[],
    labels: string[]
  }>({
    series: [],
    labels: []
  });

  const mockData = {
    series: [477138, 499928, 444867, 220426, 473088],
    labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  }

  async function carregaDados() {
    const receita = await getReceitaMes();
    setReceitaMes(receita.data);

    const total = await getQuantidadeClientes();
    setTotalClientes(total.data);

    const atvs = await getAtividades();
    setAtividades(atvs.data);

    const agendPorDia = await getAgendamentosPorDia();
    setAgendamentosPorSemana(agendPorDia.data);

    const modaPraticada = await modalidadesMaisPraticadas();
    setModalidadesPraticadas(modaPraticada.data);
  }

  useEffect(() => {
    carregaDados()

    return () => {
      setReceitaMes(0);
      setTotalClientes(0);
    }
  }, [])


  return (
    <>
      <Helmet title='Dashboard - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Dashboard</span>
        </small>
      </div>

      <div className="lg:flex lg:gap-10">
        <div className="lg:w-2/3">
          <div className="lg:flex lg:gap-10 lg:mb-10">
            <div className="card lg:w-1/2 mb-5 lg:mb-0">
              <h3 className="text-xl mb-4 font-medium text-slate-600">Clientes <span className="text-slate-300 text-lg"> | Total</span></h3>

              <div className="flex gap-6 mb-5">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100">
                  <People size={34} className="text-orange-400" />
                </div>

                <div className="flex justify-center items-start text-3xl font-semibold text-slate-700">
                  <span>{totalClientes ? totalClientes : 0}</span>
                </div>
              </div>
            </div>

            <div className="card lg:w-1/2 mb-5 lg:mb-0">
              <h3 className="text-xl mb-4 font-medium text-slate-600">Receita <span className="text-slate-300 text-lg"> | Último mês</span></h3>

              <div className="flex gap-6 mb-5">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                  <CurrencyDollar size={34} className="text-green-400" />
                </div>

                <div className="flex justify-center items-start text-3xl font-semibold text-slate-700">
                  <span>{receitaMes ? receitaMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 0}</span>
                </div>
              </div>
            </div>

          </div>

          <div className="card mb-5 lg:mb-0">
            <h3 className="text-xl mb-4 font-medium text-slate-600">Agendamentos por dia <span className="text-slate-300 text-lg"> | Quantidade mensal</span></h3>

            <Chart
              options={{
                chart: {
                  type: 'line',
                  zoom: {
                    enabled: false
                  }
                },
                xaxis: {
                  categories: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
                }
              }}
              series={[{
                name: "Agendamentos",
                data: agendamentosPorSemana,
              }]}
              type="line"
              height="260"
            />
          </div>
        </div>


        <div className="w-full lg:w-1/3">
          <div className="card mb-5 lg:mb-10">
            <h3 className="text-xl mb-4 font-medium text-slate-600">Atividades recentes <span className="text-slate-300 text-lg"> | Hoje</span></h3>

            <ul>
              {
                atividades && atividades.map(atividade => (
                  <li key={atividade.descricao} className="flex gap-2 items-center justify-start mb-3">
                    <div className="w-2 h-2 bg-stone-500"></div>
                    {atividade.descricao}
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl mb-4 font-medium text-slate-600">Modalidades mais praticadas</h3>

            <Chart
              options={{
                colors: [
                  '#2E93fA', '#66DA26', '#9265ff', '#E91E63', '#FF9800'
                ],
                legend: {
                  show: true
                },
                labels: modalidadesPraticadas.labels,
              }}
              series={modalidadesPraticadas.series}
              type="pie"
              height="240"
            />
          </div>
        </div>
      </div>
    </>
  );
}