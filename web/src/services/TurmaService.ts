import { useQuery } from "react-query";
import { api } from "./api";

interface CriarTurma {
  capacidade: number;
  horaInicio: string;
  horaFim: string;
  colaboradorId: string;
  modalidadeId: number;
}

interface AtualizarTurma extends CriarTurma {
  id: number;
}

type Turma = {
  id: number;
  capacidade: number;
  horaInicio: string;
  horaFim: string;
  colaboradorId: string;
  modalidadeId: number;
  modalidade: {
    id: number;
    descricao: string;
  }
}

export function getTurmas() {
  const { data, isFetching, error } = useQuery<Turma[], Error>('turmas', async () => {
    const response = await api.get('turma');

    return response.data;
  }, {
    refetchOnWindowFocus: false
  });

  return {
    turmas: data,
    isFetchingTurmas: isFetching,
    errorTurmas: error
  } 
}

export async function getTurmaById(id: number) {
  try {
    const response = await api.get(`turma/${id}`);

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

export async function criarTurma(dados: CriarTurma) {
  try {
    const response = await api.post('turma', {
      capacidade: dados.capacidade,
      horaInicio: dados.horaInicio,
      horaFim: dados.horaFim,
      colaboradorId: dados.colaboradorId,
      modalidadeId: dados.modalidadeId,
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

export async function atualizarTurma(dados: AtualizarTurma) {
  try {
    const response = await api.put('turma', {
      id: dados.id,
      capacidade: dados.capacidade,
      horaInicio: dados.horaInicio,
      horaFim: dados.horaFim,
      colaboradorId: dados.colaboradorId,
      modalidadeId: dados.modalidadeId,
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

export async function excluirTurma(id: number) {
  try {
    const response = await api.delete(`turma/${id}`);

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
