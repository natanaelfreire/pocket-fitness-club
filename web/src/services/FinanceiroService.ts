import { api } from "./api";

export async function getBalancoAnual() {
  try {
    const response = await api.get('financeiro/balancoanual');

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

export async function getMovimentacoesRecentes() {
  try {
    const response = await api.get('financeiro/movimentacoesrecentes');

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
