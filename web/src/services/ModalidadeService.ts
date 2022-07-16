import { useQuery } from "react-query";
import { api } from "./api";

interface CriarModalidade {
  descricao: string;
};

interface AtualizarModalidade extends CriarModalidade {
  id: number;
}

type Modalidade = {
  id: number;
  descricao: string;
}

export function getModalidades() {
  const { data, isFetching, error } = useQuery<Modalidade[], Error>('modalidades', async () => {
    const response = await api.get('modalidade');

    return response.data;
  }, {
    refetchOnWindowFocus: false
  });

  return {
    modalidades: data,
    isFetchingModalidades: isFetching,
    errorModalidades: error
  }
}

export async function getModalidadeById(id: number) {
  try {
    const response = await api.get(`modalidade/${id}`);

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

export async function criarModalidade(dados: CriarModalidade) {
  try {
    const response = await api.post('modalidade', {
      descricao: dados.descricao
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

export async function atualizarModalidade(dados: AtualizarModalidade) {
  try {
    const response = await api.put('modalidade', {
      id: dados.id,
      descricao: dados.descricao
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

export async function excluirModalidade(id: number) {
  try {
    const response = await api.delete(`modalidade/${id}`);

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
