import { api } from "./api";

export async function getAgendamentosPorCliente(clienteId: string) {
  try {
    const response = await api.get('agendamentosporcliente/' + clienteId);

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

export async function getRecebimentosPorCliente(clienteId: string) {
  try {
    const response = await api.get('recebimentosporcliente/' + clienteId);

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