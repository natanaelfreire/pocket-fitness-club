import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Chart from 'react-apexcharts';
import { ArrowLeftSquareFill } from '@styled-icons/bootstrap/ArrowLeftSquareFill';
import { ArrowRightSquareFill } from '@styled-icons/bootstrap/ArrowRightSquareFill';
import { Table } from "../../components/Table";

import { getBalancoAnual, getMovimentacoesRecentes } from "../../services/FinanceiroService";
import { formataData } from "../../utils/formataData";

type Movimentacao = {
  id: number;
  data: string;
  tipoMovimento: string;
  cliente: string;
  valor: number;
}

export function Financeiro() {
  const [balancoAnual, setBalancoAnual] = useState<{
    entradas: number[],
    saidas: number[],
    totalEntradas: number,
    totalSaidas: number,
  }>({
    entradas: [],
    saidas: [],
    totalEntradas: 0,
    totalSaidas: 0
  });

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  async function carregaDados() {
    const balanco = await getBalancoAnual();
    setBalancoAnual(balanco.data);

    const moves = await getMovimentacoesRecentes();
    setMovimentacoes(moves.data);
  }

  useEffect(() => {
    carregaDados();

  }, [])

  var options = {
    colors: [
      '#26e7a6',
      '#cf2e2e',
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    yaxis: {
      title: {
        text: 'R$ (reais)'
      }
    },
  };

  return (
    <>
      <Helmet title='Financeiro - Pocket Fitness Club' />
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Financeiro</h2>
        <small className="text-slate-600">
          <Link className="hover:underline hover:underline-offset-1" to="/">Home</Link> / <span className="underline underline-offset-1">Financeiro</span>
        </small>
      </div>


      <div className="lg:flex lg:gap-10">
        <div className="lg:w-2/3">
          <div className="card mb-5 lg:mb-10">
            <h3 className="text-xl mb-4 font-medium text-slate-600">Balanço anual</h3>
            <Chart
              options={options}
              type="bar"
              height={290}
              series={[{
                name: 'Entradas',
                data: balancoAnual.entradas,
              }, {
                name: 'Saídas',
                data: balancoAnual.saidas
              }]}
            />
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="card mb-5 lg:mb-10">
            <div>
              <ArrowRightSquareFill size={48} className="text-[#26e7a6] mb-6" />
            </div>
            <h3 className="text-lg mb-2 font-medium text-slate-400">Entradas</h3>
            <span className="text-2xl font-semibold">{balancoAnual.totalEntradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>

          </div>
          <div className="card mb-5 lg:mb-10">
            <div>
              <ArrowLeftSquareFill size={48} className="text-rose-400 mb-6" />
            </div>
            <h3 className="text-lg mb-2 font-medium text-slate-400">Saídas</h3>
            <span className="text-2xl font-semibold">{balancoAnual.totalSaidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>

          </div>
        </div>
      </div>

      <div className="card mb-5 lg:mb-10">
        <h3 className="text-xl mb-4 font-medium text-slate-600">Movimentações recentes</h3>

        <Table
          items={movimentacoes}
          columns={[
            {
              head: '#',
              renderItem: (item) => {
                return item.id;
              }
            },
            {
              head: 'Data',
              renderItem: (item) => {
                return formataData(item.data);
              }
            },
            {
              head: 'Tipo movimento',
              renderItem: (item) => {
                return item.tipoMovimento;
              }
            },
            {
              head: 'Cliente',
              renderItem: (item) => {
                return item.cliente;
              }
            },
            {
              head: 'Valor',
              renderItem: (item) => {
                return item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
              }
            },
          ]}
        />
      </div>
    </>
  );
}