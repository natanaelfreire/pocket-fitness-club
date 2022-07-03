import { Request, Response } from 'express';
import { prisma } from "../prisma";

interface TurmaDadosCriacao {
  id?: number;
  capacidade: number;
  horaInicio: string;
  horaFim: string;
  modalidadeId: number;
  colaboradorId: string;
}

export class TurmaController {
  async criar(req: Request, res: Response) {
    try {
      const {
        capacidade,
        horaInicio,
        horaFim,
        colaboradorId,
        modalidadeId 
      } : TurmaDadosCriacao = req.body;
      
      if (!capacidade) {
        throw new Error("Capacidade é obrigatório.");
      }
  
      if (!horaInicio) {
        throw new Error("Hora Início é obrigatório.");
      }
  
      if (!horaFim) {
        throw new Error("Hora Fim é obrigatório.");
      }
  
      if (!colaboradorId) {
        throw new Error("Colaborador é obrigatório.");
      }
  
      if (!modalidadeId) {
        throw new Error("Modalidade é obrigatório.");
      }
  
      await prisma.turma.create({
        data: {
          capacidade: capacidade,
          horaInicio: new Date(horaInicio),
          horaFim: new Date(horaFim),
          modalidadeId: modalidadeId,
          colaboradorId: colaboradorId
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
      const turmas = await prisma.turma.findMany({
        include: {
          colaborador: true,
          modalidade: true,
          agendamentos: {
            include: {
              cliente: true
            }
          },
        }
      })

      return res.status(200).json(turmas);
      
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
        capacidade,
        horaInicio,
        horaFim,
        colaboradorId,
        modalidadeId 
      } : TurmaDadosCriacao = req.body;

      await prisma.turma.update({
        where: {
          id: id
        },
        data: {
          capacidade: capacidade,
          horaInicio: new Date(horaInicio),
          horaFim: new Date(horaFim),
          colaboradorId: colaboradorId,
          modalidadeId: modalidadeId
        }
      })

      return res.status(200).send('Turma atualizada com sucesso!');
      
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

      await prisma.agendamento.deleteMany({
        where: {
          turmaId: parseInt(id)
        }
      })

      await prisma.turma.delete({
        where: {
          id: parseInt(id)
        }
      })

      return res.status(200).send('Turma excluída com sucesso!');
      
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

      const turma = await prisma.turma.findFirst({
        include: {
          colaborador: true,
          modalidade: true,
          agendamentos: {
            include: {
              cliente: true
            }
          },
        },
        where: {
          id: parseInt(id)
        }
      })

      if (turma == null) {
        throw new Error("Turma não encontrada.");
      }

      return res.status(200).json(turma);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}
