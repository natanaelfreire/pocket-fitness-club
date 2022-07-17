import { useQuery } from "react-query";
import { api } from "./api";

interface CriarCliente {
  nome: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  dataMensalidade: string;
  valorMensalidade: number;
  ativo: boolean;
};

interface AtualizarCliente extends CriarCliente {
  id: string;
}

type Cliente = {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  dataMensalidade: string;
  valorMensalidade: number;
  ativo: boolean;
}

export function getClientes(clienteId: string, cpf: string, status: string) {
  const { data, isFetching, error, refetch } = useQuery<Cliente[], Error>('clientes', async () => {
    const response = await api.post('cliente/listagem', {
      clienteId,
      cpf,
      status
    });

    return response.data;
  }, {
    refetchOnWindowFocus: true
  });

  return {
    clientes: data,
    isFetchingClientes: isFetching,
    errorClientes: error,
    refetch
  }
}

export async function getClienteById(id: string) {
  try {
    const response = await api.get(`cliente/${id}`);

    return {
      sucesso: true,
      data: response.data,
    }
    
  } catch (error: Error | any) {
    if (!error.message) {
      return {
        sucesso: false,
        mensagem: 'Não foi possível conectar ao servidor.'
      }
    } else {
      return {
        sucesso: false,
        mensagem: error.message
      }
    }
  }
}

export async function criarCliente(dados: CriarCliente) {
  try {
    const response = await api.post('cliente', {
      nome: dados.nome,
      cpf: dados.cpf,
      dataNascimento: dados.dataNascimento,
      endereco: dados.endereco,
      telefone: dados.telefone,
      dataMensalidade: dados.dataMensalidade,
      valorMensalidade: dados.valorMensalidade,
      ativo: dados.ativo
    });

    return {
      sucesso: true,
      data: response.data,
    }
    
  } catch (error: Error | any) {
    if (!error.message) {
      return {
        sucesso: false,
        mensagem: 'Não foi possível conectar ao servidor.'
      }
    } else {
      return {
        sucesso: false,
        mensagem: error.message
      }
    }
  }
}

export async function atualizarCliente(dados: AtualizarCliente) {
  try {
    const response = await api.put('cliente', {
      id: dados.id,
      nome: dados.nome,
      cpf: dados.cpf,
      dataNascimento: dados.dataNascimento,
      endereco: dados.endereco,
      telefone: dados.telefone,
      dataMensalidade: dados.dataMensalidade,
      valorMensalidade: dados.valorMensalidade,
      ativo: dados.ativo
    });

    return {
      sucesso: true,
      data: response.data,
    }
    
  } catch (error: Error | any) {
    if (!error.message) {
      return {
        sucesso: false,
        mensagem: 'Não foi possível conectar ao servidor.'
      }
    } else {
      return {
        sucesso: false,
        mensagem: error.message
      }
    }
  }
}

export async function excluirCliente(id: string) {
  try {
    const response = await api.delete(`cliente/${id}`);

    return {
      sucesso: true,
      data: response.data,
    }
    
  } catch (error: Error | any) {
    if (!error.message) {
      return {
        sucesso: false,
        mensagem: 'Não foi possível conectar ao servidor.'
      }
    } else {
      return {
        sucesso: false,
        mensagem: error.message
      }
    }
  }
}
