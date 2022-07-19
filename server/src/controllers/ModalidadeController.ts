import { Request, Response } from 'express';
import { prisma } from "../prisma";
import { dateInISOString } from '../utils/dateInISOString';

interface ModalidadeDadosCriacao {
  descricao: string;
}

export class ModalidadeController {
  async criar(req: Request, res: Response) {
    try {
      const {
        descricao,
      }: ModalidadeDadosCriacao = req.body;

      if (!descricao) {
        throw new Error("Descrição é obrigatório.");
      }

      const modalidadeJaExiste = await prisma.modalidade.findFirst({
        where: {
          descricao: descricao.toUpperCase()
        }
      })

      if (modalidadeJaExiste != null)
        throw new Error("Modalidade já existe.");

      await prisma.modalidade.create({
        data: {
          descricao: descricao.toUpperCase(),
          dataCriacao: dateInISOString()
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
      const modalidades = await prisma.modalidade.findMany();

      return res.status(200).json(modalidades);

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
        descricao
      } = req.body;

      if (!descricao) {
        throw new Error("Descrição é obrigatório.");
      }

      const modalidadeExiste = await prisma.modalidade.findFirst({
        where: {
          id: id
        }
      })

      if (modalidadeExiste == null)
        throw new Error("Modalidade não encontrada");

      const modalidadeJaExiste = await prisma.modalidade.findFirst({
        where: {
          descricao: descricao.toUpperCase(),
          NOT: {
            id: id
          }
        },
      })

      if (modalidadeJaExiste != null)
        throw new Error("Modalidade já existe.");

      await prisma.modalidade.update({
        data: {
          descricao: descricao.toUpperCase(),
        },
        where: {
          id: id
        }
      })

      return res.status(200).send('Modalidade atualizada com sucesso!');

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

      await prisma.modalidade.delete({
        where: {
          id: parseInt(id)
        }
      })

      return res.status(200).send('Modalidade excluída com sucesso!');

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

      const modalidade = await prisma.modalidade.findFirst({
        where: {
          id: parseInt(id)
        }
      })

      return res.status(200).json(modalidade);

    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
  
  async modalidadesMaisPraticadas(req: Request, res: Response) {
    try {
      const agendamentos = await prisma.agendamento.findMany({
        include: {
          turma: {
            include: {
              modalidade: true
            }
          },
        },
      })

      const modalidades = await prisma.modalidade.findMany();
      const labels: string[] = [];
      const series: number[] = [];

      for (const modalidade of modalidades) {
        const qtd = agendamentos.filter(item => item.turma.modalidadeId === modalidade.id).length;

        labels.push(modalidade.descricao);
        series.push(qtd);
      }

      return res.status(200).json({ series, labels });
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}