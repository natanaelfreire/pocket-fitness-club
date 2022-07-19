import { Request, Response } from 'express';
import { prisma } from "../prisma";
import { dateInISOString } from '../utils/dateInISOString';

export class PagamentoController {
  async criar(req: Request, res: Response) {
    try {
      const {
        descricao,
        dataPagamento,
        valor
      } = req.body;

      if (!descricao) {
        throw new Error("Descrição é obrigatório.");
      }

      if (!dataPagamento) {
        throw new Error("Pagamento é obrigatório.");
      }

      if (!valor) {
        throw new Error("Valor é obrigatório.");
      }

      await prisma.pagamento.create({
        data: {
          descricao: String(descricao).toUpperCase(),
          dataPagamento: new Date(dataPagamento),
          valor: valor,
          dataCadastro: dateInISOString(),
        }
      })

      return res.status(201).send();
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const pagamentosDb = await prisma.pagamento.findMany({
        select: {
          id: true,
          descricao: true,
          dataPagamento: true,
          valor: true,
        },
        orderBy: {
          id: 'desc'
        }
      })

      const pagamentos = pagamentosDb.map(pagamentoDb => {
        return {
          ...pagamentoDb,
          valor: pagamentoDb.valor.toNumber()
        }
      })

      return res.status(200).json(pagamentos);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const {
        id,
        descricao,
        dataPagamento,
        valor
      } = req.body;

      if (!descricao) {
        throw new Error("Descrição é obrigatório.");
      }

      if (!dataPagamento) {
        throw new Error("Pagamento é obrigatório.");
      }

      if (!valor) {
        throw new Error("Valor é obrigatório.");
      }

      await prisma.pagamento.update({
        where: {
          id: id
        },
        data: {
          descricao: String(descricao).toUpperCase(),
          dataPagamento: new Date(dataPagamento),
          valor: valor
        }
      })

      return res.status(200).send('Pagamento atualizado com sucesso!');
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.pagamento.delete({
        where: {
          id: parseInt(id)
        }
      })

      return res.status(200).send('Pagamento excluído com sucesso!');
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async mostrar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const pagamentoDb = await prisma.pagamento.findFirst({
        where: {
          id: parseInt(id)
        },
      })

      if (pagamentoDb == null) {
        throw new Error("Pagamento não encontrado.");
      }

      const pagamento = {
        ...pagamentoDb,
        valor: pagamentoDb.valor.toNumber()
      }

      return res.status(200).json(pagamento);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}