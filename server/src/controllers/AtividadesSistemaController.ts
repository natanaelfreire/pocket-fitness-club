import { Request, Response } from 'express';
import { prisma } from "../prisma";

export class AtividadesSistemaController {
  async criar(descricao: string) {
    try {
      await prisma.atividadesSistema.create({
        data: {
          descricao: descricao,
        }
      })

      return;
      
    } catch (error: unknown) {
      return;
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const atividadesSistema = await prisma.atividadesSistema.findMany({
        orderBy: {
          dataCadastro: 'desc'
        },
        take: 4
      })

      return res.status(200).json(atividadesSistema);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async totalClientes(req: Request, res: Response) {
    try {
      const total = await prisma.cliente.count()

      return res.status(200).json(total);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}