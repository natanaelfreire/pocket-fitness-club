import { api } from "./api";

interface AuthorizationResponse {
  id: string;
  nome: string;
  perfilAcesso: 'Admin' | 'Aluno' | 'Atendente' | 'Professor'
}

export const signIn = async (email: string, senha: string) => {
  try {
    const response = await api.post<AuthorizationResponse>('authorization', {
      email,
      senha
    })

    return {
      sucesso: true,
      data: response.data,
      mensagem: 'Login realizado com sucesso!'
    }

  } catch (error: Error | any) {
    if (!error.message) {
      return {
        sucesso: false,
        data: null,
        mensagem: "Não foi possível conectar ao servidor."
      }
    }
    else {
      return {
        sucesso: false,
        data: null,
        mensagem: error.message as string
      }
    }
  }
}

export const Logout = () => {
  api.defaults.headers.common['perfil'] = '';
  localStorage.removeItem('@pocket:user');

  window.location.href = '/';
}
