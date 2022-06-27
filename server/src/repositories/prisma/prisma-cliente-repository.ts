import { prisma } from "../../prisma";
import { ClienteDados, ClienteDadosCriacao, ClienteRepository, FiltrosListarClientes } from "../cliente-repository";

export class PrismaClienteRepository implements ClienteRepository {
  async getClientePorCPF(cpf: string) {
    const clientePrisma = await prisma.cliente.findUnique({
      where: {
        cpf: cpf
      }
    })

    if (clientePrisma !== null) {
      const cliente : ClienteDados = {
        ...clientePrisma,
        dataNascimento: clientePrisma.dataNascimento.toISOString(),
        dataMensalidade: clientePrisma.dataMensalidade.toISOString(),
        valorMensalidade: clientePrisma.valorMensalidade.toNumber(),
      }
  
      return cliente;
    }

    return clientePrisma;
  }

  async validaCPFUnico(cpf: string, id?: string) {
    const cliente = await prisma.cliente.findFirst({
      where: {
        NOT: {
          id: id
        },
        cpf: cpf
      }
    })

    if (cliente == null)
      return true;
    else
      return false;
  }
  
  async criar(dados: ClienteDadosCriacao) {
    const {
      nome,
      cpf,
      dataNascimento,
      endereco,
      telefone,
      dataMensalidade,
      valorMensalidade,
      ativo,
    } = dados;

    await prisma.cliente.create({
      data: {
        nome,
        cpf,
        dataNascimento: new Date(dataNascimento),
        endereco,
        telefone,
        dataMensalidade: new Date(dataMensalidade),
        valorMensalidade,
        ativo,
      },
    })
  }

  async getClientePorId(id: string) {
    const clientePrisma = await prisma.cliente.findUnique({
      where: {
        id: id
      }
    })

    if (clientePrisma !== null) {
      const cliente : ClienteDados = {
        ...clientePrisma,
        dataNascimento: clientePrisma.dataNascimento.toISOString(),
        dataMensalidade: clientePrisma.dataMensalidade.toISOString(),
        valorMensalidade: clientePrisma.valorMensalidade.toNumber(),
      }
  
      return cliente;
    }

    return clientePrisma;
  }

  async atualizar(dados: ClienteDados) {
    await prisma.cliente.update({
      data: {
        nome: dados.nome,
        cpf: dados.cpf,
        telefone: dados.telefone,
        endereco: dados.endereco,
        valorMensalidade: dados.valorMensalidade,
        ativo: dados.ativo,  
        dataNascimento: new Date(dados.dataNascimento),
        dataMensalidade: new Date(dados.dataMensalidade),
      },
      where: {
        id: dados.id
      }
    })
  }

  async excluir(id: string) {
    const usuario = await prisma.usuario.findFirst({
      where: {
        clienteId: id
      }
    })

    if (usuario != null) {
      await prisma.usuario.delete({
        where: {
          clienteId: id
        }
      })
    }      
    
    await prisma.cliente.delete({
      where: {
        id: id
      }
    })
  }

  async listar(filtros: FiltrosListarClientes) {    
    const clientesPrisma = await prisma.cliente.findMany({
      orderBy: {
        nome: 'asc'
      },
      where: {
        id: filtros.clienteId ? filtros.clienteId : undefined,
        cpf: filtros.cpf ? filtros.cpf : undefined,
        ativo: filtros.status ? (filtros.status === "ATIVO" ? true : false) : undefined
      }
    })

    const clientes = clientesPrisma.map(clientePrisma => {
      const cliente : ClienteDados = {
        ...clientePrisma,
        dataNascimento: clientePrisma.dataNascimento.toISOString(),
        dataMensalidade: clientePrisma.dataMensalidade.toISOString(),
        valorMensalidade: clientePrisma.valorMensalidade.toNumber(),
      }

      return cliente;
    })

    return clientes;
  }
}
