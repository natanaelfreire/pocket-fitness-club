import { useQuery } from "react-query";
import { api } from "./api";

interface CriarRecebimento {
  descricao: string;
  clienteId?: string;
  dataRecebimento: string;
  valor: number;
  referencia: string;
};

interface AtualizarRecebimento extends CriarRecebimento {
  id: number;
}

type Recebimento = {
  id: number;
  descricao: string;
  clienteId?: string;
  cliente?: {
    nome: string;
  }
  dataRecebimento: string;
  valor: number;
  referencia: string;
}

export function getRecebimentos() {
  const { data, isFetching, error } = useQuery<Recebimento[], Error>('recebimentos', async () => {
    const response = await api.get('recebimento');

    return response.data;
  });

  return {
    recebimentos: data,
    isFetchingRecebimentos: isFetching,
    errorRecebimentos: error
  }
}

export async function getRecebimentoById(id: number) {
  try {
    const response = await api.get(`recebimento/${id}`);

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

export async function criarRecebimento(dados: CriarRecebimento) {
  try {
    const response = await api.post('recebimento', {
      descricao: dados.descricao,
      clienteId: dados.clienteId,
      dataRecebimento: dados.dataRecebimento,
      valor: dados.valor,
      referencia: dados.referencia
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

export async function atualizarRecebimento(dados: AtualizarRecebimento) {
  try {
    const response = await api.put('recebimento', {
      id: dados.id,
      descricao: dados.descricao,
      clienteId: dados.clienteId,
      dataRecebimento: dados.dataRecebimento,
      valor: dados.valor,
      referencia: dados.referencia
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

export async function excluirRecebimento(id: number) {
  try {
    const response = await api.delete(`recebimento/${id}`);

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