import { Request, Response } from 'express';
import { prisma } from "../prisma";
import { dateInISOString } from '../utils/dateInISOString';

export class RecebimentoController {
  async criar(req: Request, res: Response) {
    try {
      const {
        descricao,
        clienteId,
        dataRecebimento,
        valor,
        referencia
      } = req.body;

      if (!descricao) {
        throw new Error("Descrição é obrigatório.");
      }

      if (!dataRecebimento) {
        throw new Error("Data de Recebimento é obrigatório.");
      }

      if (!valor) {
        throw new Error("Valor é obrigatório.");
      }

      if (!referencia) {
        throw new Error("Referência é obrigatório.");
      }

      if (referencia === 'MENSALIDADE' && !clienteId) {
        throw new Error("Cliente é obrigatório caso a referência seja MENSALIDADE.");
      }

      await prisma.recebimento.create({
        data: {
          descricao: String(descricao).toUpperCase(),
          clienteId: clienteId ? clienteId : undefined,
          dataRecebimento: new Date(dataRecebimento),
          valor: valor,
          referencia: referencia,
        }
      })

      if (referencia === 'MENSALIDADE') {
        const dataMensalidade = new Date();
        dataMensalidade.setMonth(dataMensalidade.getMonth() + 1);

        await prisma.cliente.update({
          where: {
            id: clienteId
          },
          data: {
            dataMensalidade: dataMensalidade
          }
        })
      }

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
      const recebimentosDb = await prisma.recebimento.findMany({
        select: {
          id: true,
          descricao: true,
          referencia: true,
          valor: true,
          cliente: {
            select: {
              nome: true,
            }
          },
          dataCadastro: true,
          dataRecebimento: true,
        },
        orderBy: {
          id: 'desc'
        }
      })

      const recebimentos = recebimentosDb.map(recebimentoDb => {
        return {
          ...recebimentoDb,
          valor: recebimentoDb.valor.toNumber()
        }
      })

      return res.status(200).json(recebimentos);
      
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
        clienteId,
        dataRecebimento,
        valor,
        referencia
      } = req.body;

      if (!descricao) {
        throw new Error("Descrição é obrigatório.");
      }

      if (!dataRecebimento) {
        throw new Error("Data de Recebimento é obrigatório.");
      }

      if (!valor) {
        throw new Error("Valor é obrigatório.");
      }

      if (!referencia) {
        throw new Error("Referência é obrigatório.");
      }

      await prisma.recebimento.update({
        data: {
          clienteId: clienteId,
          dataRecebimento: new Date(dataRecebimento),
          descricao: String(descricao).toUpperCase(),
          referencia: referencia,
          valor: valor
        },
        where: {
          id: id
        }
      })

      return res.status(200).send('Recebimento atualizado com sucesso!');
      
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

      await prisma.recebimento.delete({
        where: {
          id: parseInt(id)
        }
      })

      return res.status(200).send('Recebimento excluído com sucesso!');

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

      console.log('É aqui??')

      const recebimentoDb = await prisma.recebimento.findFirst({
        where: {
          id: parseInt(id)
        },
      })

      if (recebimentoDb == null) {
        throw new Error("Recebimento não encontrado.");
      }

      const recebimento = {
        ...recebimentoDb,
        valor: recebimentoDb.valor.toNumber()
      }      

      return res.status(200).json(recebimento);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async totalMes(req: Request, res: Response) {
    try {
      const dataInicio = new Date();
      dataInicio.setMonth(dataInicio.getMonth() - 1);

      const agregado = await prisma.recebimento.aggregate({
        _sum: {
          valor: true
        },
        where: {
          dataRecebimento: {
            gte: dataInicio,
          }
        }
      })

      const total = agregado._sum.valor ? agregado._sum.valor.toNumber() : 0;

      return res.status(200).json(total);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}