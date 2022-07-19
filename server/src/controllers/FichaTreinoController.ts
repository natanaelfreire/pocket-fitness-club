import { Request, Response } from 'express';
import { prisma } from "../prisma";
import { dateInISOString } from '../utils/dateInISOString';

type Exercicio = {
  descricao: string;
  grupoMuscular: string;
  peso: number;
  repeticoes: number;
  series: number;
  observacao: string;
}

type DivisaoTreino = {
  descricao: string;
  exercicios: Exercicio[];
}

interface CriarFichaTreino {
  descricao: string;
  colaboradorId: string;
  clienteId: string;
  modalidadeId: number;
  divisoesTreino: DivisaoTreino[];
}

export class FichaTreinoController {
  async criar(req: Request, res: Response) {
    try { 
      const {
        descricao,
        colaboradorId,
        clienteId,
        modalidadeId,
        divisoesTreino,
      }: CriarFichaTreino = req.body;

      const fichaTreino = await prisma.fichaTreino.create({
        data: {
          descricao: descricao,
          clienteId: clienteId,
          colaboradorId: colaboradorId,
          modalidadeId: modalidadeId,
          dataCadastro: dateInISOString()          
        }
      })
      
      for (const divisao of divisoesTreino) {
        const divisaoTreino = await prisma.divisaoTreino.create({
          data: {
            descricao: divisao.descricao,
            fichaTreinoId: fichaTreino.id
          }
        })

        for (const exercicio of divisao.exercicios) {
          await prisma.exercicioFichaTreino.create({
            data: {
              divisaoTreinoId: divisaoTreino.id,
              descricao: exercicio.descricao,
              grupoMuscular: exercicio.grupoMuscular,
              observacao: exercicio.observacao,
              peso: exercicio.peso,
              repeticoes: exercicio.repeticoes,
              series: exercicio.series
            }
          })
        }
      }
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async listar(req: Request, res: Response) {
    try {
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async mostrar(req: Request, res: Response) {
    try {
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}