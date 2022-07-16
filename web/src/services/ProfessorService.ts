import { useQuery } from "react-query";
import { api } from "./api";

interface CriarProfessor {
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  especialidade: string;
  formacao: string;
  cargo: string;
};

interface AtualizarProfessor extends CriarProfessor {
  id: string;
}

type Professor = {
  id: string;
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  especialidade: string;
  formacao: string;
  cargo: string;
}

export function getProfessores() {
  const { data, isFetching, error } = useQuery<Professor[], Error>('professores', async () => {
    const response = await api.get('colaborador');

    return response.data;
  }, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5
  });

  return {
    professores: data,
    isFetchingProfessores: isFetching,
    errorProfessores: error
  }
}

export async function getProfessorById(id: string) {
  try {
    const response = await api.get(`colaborador/${id}`);

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

export async function criarProfessor(dados: CriarProfessor) {
  try {
    const response = await api.post('colaborador', {
      nome: dados.nome,
      cpf: dados.cpf,
      endereco: dados.endereco,
      telefone: dados.telefone,
      especialidade: dados.especialidade,
      formacao: dados.formacao,
      cargo: dados.cargo,
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

export async function atualizarProfessor(dados: AtualizarProfessor) {
  try {
    const response = await api.put('colaborador', {
      id: dados.id,
      nome: dados.nome,
      cpf: dados.cpf,
      endereco: dados.endereco,
      telefone: dados.telefone,
      especialidade: dados.especialidade,
      formacao: dados.formacao,
      cargo: dados.cargo,
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

export async function excluirProfessor(id: string) {
  try {
    const response = await api.delete(`colaborador/${id}`);

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