import { Request, Response } from 'express';
import { PrismaClienteRepository } from '../repositories/prisma/prisma-cliente-repository';

import { CriarClienteUseCase } from '../use-cases/criar-cliente-use-case';
import { ListarClientesUseCase } from '../use-cases/listar-clientes-use-case';
import { AtualizarClienteUseCase } from '../use-cases/atualizar-cliente-use-case';
import { DeletarClienteUseCase } from '../use-cases/deletar-cliente-use-case';
import { MostrarClienteUseCase } from '../use-cases/mostrar-cliente-use-case';

export class ClienteController {
  async criar(req: Request, res: Response) {
    try {
      const  {
        nome,
        cpf,
        dataNascimento,
        endereco,
        telefone,
        dataMensalidade,
        valorMensalidade,
        ativo
      } = req.body;
    
      const prismaClienteRepository = new PrismaClienteRepository();
      const criarClienteUseCase = new CriarClienteUseCase(prismaClienteRepository);
    
      await criarClienteUseCase.execute({
        nome,
        cpf,
        dataNascimento,
        endereco,
        telefone,
        dataMensalidade,
        valorMensalidade,
        ativo
      });
    
      return res.status(201).send();
      
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const {
        clienteId,
        cpf,
        status
      } = req.body;
      
      const prismaClienteRepository = new PrismaClienteRepository();
      const listarClientesUseCase = new ListarClientesUseCase(prismaClienteRepository);

      const clientes = await listarClientesUseCase.execute({
        clienteId,
        cpf,
        status
      })

      return res.status(200).json(clientes);

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
        dataMensalidade,
        dataNascimento,
        endereco,
        telefone,
        valorMensalidade,
        ativo
      } = req.body;

      const prismaClienteRepository = new PrismaClienteRepository();
      const atualizarClientesUseCase = new AtualizarClienteUseCase(prismaClienteRepository);

      await atualizarClientesUseCase.execute({
        id,
        nome,
        cpf,
        dataMensalidade,
        dataNascimento,
        endereco,
        telefone,
        valorMensalidade,
        ativo
      })

      return res.status(200).send('Cliente atualizado com sucesso!');
      
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prismaClienteRepository = new PrismaClienteRepository();
      const deletarClientesUseCase = new DeletarClienteUseCase(prismaClienteRepository);

      await deletarClientesUseCase.execute(id);
      
      return res.status(200).send('Cliente deletado com sucesso!');

    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  async mostrar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prismaClienteRepository = new PrismaClienteRepository();
      const mostrarClientesUseCase = new MostrarClienteUseCase(prismaClienteRepository);

      const cliente = await mostrarClientesUseCase.execute(id);
      
      return res.status(200).send(cliente);

    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
