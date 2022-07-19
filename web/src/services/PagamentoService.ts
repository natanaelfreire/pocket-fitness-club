import { useQuery } from "react-query";
import { api } from "./api";

interface CriarPagamento {
  descricao: string;
  dataPagamento: string;
  valor: number;
};

interface AtualizarPagamento extends CriarPagamento {
  id: number;
}

type Pagamento = {
  id: number;
  descricao: string;
  dataPagamento: string;
  valor: number;
}

export function getPagamentos() {
  const { data, isFetching, error } = useQuery<Pagamento[], Error>('pagamentos', async () => {
    const response = await api.get('pagamento');

    return response.data;
  });

  return {
    pagamentos: data,
    isFetchingPagamentos: isFetching,
    errorPagamentos: error
  }
}

export async function getPagamentoById(id: number) {
  try {
    const response = await api.get(`pagamento/${id}`);

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

export async function criarPagamento(dados: CriarPagamento) {
  try {
    const response = await api.post('pagamento', {
      descricao: dados.descricao,
      dataPagamento: dados.dataPagamento,
      valor: dados.valor,
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

export async function atualizarPagamento(dados: AtualizarPagamento) {
  try {
    const response = await api.put('pagamento', {
      id: dados.id,
      descricao: dados.descricao,
      dataPagamento: dados.dataPagamento,
      valor: dados.valor,
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

export async function excluirPagamento(id: number) {
  try {
    const response = await api.delete(`pagamento/${id}`);

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