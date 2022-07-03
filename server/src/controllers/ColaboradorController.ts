import { Request, Response } from 'express';
import { prisma } from "../prisma";
import { dateInISOString } from '../utils/dateInISOString';

interface ColaboradorDadosCriacao {
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  especialidade: string;
  formacao: string;
  cargo: string;
}

export class ColaboradorController {
  async criar(req: Request, res: Response) {
    try {
      const {
        nome,
        cpf,
        endereco,
        telefone,
        especialidade,
        formacao,
        cargo,
      } : ColaboradorDadosCriacao = req.body;

      if (!nome) {
        throw new Error("Nome é obrigatório.");
      }

      if (!cpf) {
        throw new Error("CPF é obrigatório.");
      }

      if (!cargo) {
        throw new Error("Cargo é obrigatório.");
      }

      const cpfSemFormatacao = cpf.replace(/\./g, "").replace("-", "").trim()
      const telefoneSemFormatacao = telefone.replace("(", "").replace(")", "").replace("-", "").replace(/\s/g, "").trim()

      const validaCPFUnico = await prisma.colaborador.findFirst({
        where: {
          cpf: cpfSemFormatacao
        }
      })

      if (validaCPFUnico != null) {
        throw new Error("CPF já cadastrado.");
      }

      await prisma.colaborador.create({
        data: {
          nome: nome.toUpperCase(),
          cpf: cpfSemFormatacao,
          telefone: telefoneSemFormatacao,
          endereco,
          especialidade,
          formacao,
          cargo,
          dataCriacao: dateInISOString()     
        }
      })

      return res.status(201).send();
      
    } catch (error: any) {
      return res.status(400).send(error.message);
    }   
  }

  async listar(req: Request, res: Response) {
    try {
      const colaboradores = await prisma.colaborador.findMany({
        orderBy: {
          nome: 'asc'
        },
      });

      return res.status(200).json(colaboradores);
      
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const {
        id,
        nome,
        cpf,
        endereco,
        telefone,
        especialidade,
        formacao,
        cargo,
      } = req.body;

      await prisma.colaborador.update({
        where: {
          id: id
        },
        data: {
          nome,
          cpf,
          endereco,
          telefone,
          especialidade,
          formacao,
          cargo,
        }
      })

      return res.status(200).send('Colaborador atualizado com sucesso!');
      
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.colaborador.delete({
        where: {
          id: id
        }
      })

      return res.status(200).send('Colaborador deletado com sucesso!');
      
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async mostrar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const colaborador = await prisma.colaborador.findFirst({
        where: {
          id: id
        }
      })

      return res.status(200).json(colaborador);
      
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
