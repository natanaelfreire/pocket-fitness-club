import { Request, Response } from 'express';
import { prisma } from "../prisma";
import { dateInISOString } from '../utils/dateInISOString';

interface AgendamentoDadosCriacao {
  id?: number;
  clienteId: string;
  turmaId: number;
  usuarioCadastro: string;
}

export class AgendamentoController {
  async criar(req: Request, res: Response) {
    try {
      const {
        clienteId,
        turmaId,
        usuarioCadastro
      } : AgendamentoDadosCriacao = req.body;

      if (!clienteId) {
        throw new Error("Cliente é obrigatório.");
      }

      if (!turmaId) {
        throw new Error("Turma é obrigatório.");
      }

      if (!usuarioCadastro) {
        throw new Error("Usuário Cadastro é obrigatório.");
      }

      const agendamentoJaExiste = await prisma.agendamento.findFirst({
        where: {
          clienteId: clienteId,
          turmaId: turmaId
        }
      })

      if (agendamentoJaExiste != null) {
        throw Error(`Agendamento para esta Turma já foi feito.${agendamentoJaExiste.cancelado ? ' E foi cancelado.' : ''}`);
      }

      await prisma.agendamento.create({
        data: {
          clienteId: clienteId,
          turmaId: turmaId,
          cancelado: false,
          dataAgendamento: dateInISOString(),
          usuarioCadastro: usuarioCadastro
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
      const agendamentos = await prisma.agendamento.findMany({
        include: {
          cliente: {
            select: {
              valorMensalidade: true
            }
          },
          turma: true
        }
      })

      return res.status(200).json(agendamentos);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async cancelar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("Id do agendamento é obrigatório.");
      }

      await prisma.agendamento.update({
        data: {
          cancelado: true,
        },
        where: {
          id: parseInt(id)
        }
      })

      return res.status(200).send("Agendamento cancelado com sucesso!");
      
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
      const { id } = req.params;

      if (!id) {
        throw new Error("Id do agendamento é obrigatório.");
      }

      const agendamento = await prisma.agendamento.findFirst({
        include: {
          cliente: true,
          turma: true
        },
        where: {
          id: parseInt(id)
        }
      })

      if (agendamento === null) {
        throw new Error("Agendamento não encontrado.");
      }

      return res.status(200).json(agendamento);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async agendamentosPorDia(req: Request, res: Response) {
    try {
      const dataInicio = new Date();
      dataInicio.setMonth(dataInicio.getMonth() - 1);

      const agendamentos = await prisma.agendamento.findMany({
        include: {
          turma: true,
        },
        where: {
          dataAgendamento: {
            gt: dataInicio
          }
        }
      })

      const qtdSegunda = agendamentos.filter(item => item.turma.horaInicio.getDay() === 1).length;
      const qtdTerca = agendamentos.filter(item => item.turma.horaInicio.getDay() === 2).length;
      const qtdQuarta = agendamentos.filter(item => item.turma.horaInicio.getDay() === 3).length;
      const qtdQuinta = agendamentos.filter(item => item.turma.horaInicio.getDay() === 4).length;
      const qtdSexta = agendamentos.filter(item => item.turma.horaInicio.getDay() === 5).length;
      const qtdSabado = agendamentos.filter(item => item.turma.horaInicio.getDay() === 6).length;
      const qtdDomingo = agendamentos.filter(item => item.turma.horaInicio.getDay() === 0).length;

      const lista = [qtdSegunda, qtdTerca, qtdQuarta, qtdQuinta, qtdSexta, qtdSabado, qtdDomingo];
      
      return res.status(200).json(lista);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}
