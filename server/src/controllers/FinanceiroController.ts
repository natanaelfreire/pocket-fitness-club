import { Request, Response } from 'express';
import { prisma } from "../prisma";

export class FinanceiroController {
  async balancoAnual(req: Request, res: Response) {
    try {
      const dataInicio = new Date();
      dataInicio.setFullYear(dataInicio.getFullYear() - 1);

      const pagamentos = await prisma.pagamento.findMany({
        where: {
          dataPagamento: {
            gt: dataInicio
          }
        }
      })

      const recebimentos = await prisma.recebimento.findMany({
        where: {
          dataRecebimento: {
            gt: dataInicio
          }
        }
      })

      const initialValue = 0;
      const entradas = [];
      const saidas = [];

      for (let i = 0; i < 12; i++) {
        const recebimentosMes = recebimentos.filter(item => item.dataRecebimento.getMonth() === i);
        const totalMes = recebimentosMes.reduce((previousValue, currentValue) => previousValue + currentValue.valor.toNumber(),
        initialValue)

        entradas.push(totalMes);

        const pagamentosMes = pagamentos.filter(item => item.dataPagamento.getMonth() === i);
        const totalMesPag = pagamentosMes.reduce((previousValue, currentValue) => previousValue + currentValue.valor.toNumber(),
        initialValue)

        saidas.push(totalMesPag);
      }

      const totalEntradas = entradas.reduce((prev, next) => prev + next, 0);
      const totalSaidas = saidas.reduce((prev, next) => prev + next, 0);

      return res.status(200).json({ entradas: entradas, saidas: saidas, totalEntradas, totalSaidas });
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async movimentacoesRecentes(req: Request, res: Response) {
    try {
      const dataInicio = new Date();
      dataInicio.setMonth(dataInicio.getMonth() - 1);

      const pagamentos = await prisma.pagamento.findMany({
        where: {
          dataPagamento: {
            gt: dataInicio
          }
        },
        orderBy: {
          dataPagamento: 'desc'
        }
      })

      const recebimentos = await prisma.recebimento.findMany({
        where: {
          dataRecebimento: {
            gt: dataInicio
          }
        },
        include: {
          cliente: true
        },
        orderBy: {
          dataRecebimento: 'desc'
        }
      })

      const movimentacoes : {
        id: number;
        data: string;
        tipoMovimento: string;
        cliente: string;
        valor: number;
      }[] = []

      pagamentos.forEach(item => {
        movimentacoes.push({
          id: item.id,
          data: item.dataPagamento.toISOString(),
          tipoMovimento: "PAGAMENTO",
          cliente: "",
          valor: item.valor.toNumber(),
        })
      })

      recebimentos.forEach(item => {
        movimentacoes.push({
          id: item.id,
          data: item.dataRecebimento.toISOString(),
          tipoMovimento: "RECEBIMENTO",
          cliente: item.cliente ? item.cliente.nome : "",
          valor: item.valor.toNumber(),
        })
      })

      return res.status(200).json(movimentacoes);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}