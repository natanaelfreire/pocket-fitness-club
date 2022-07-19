import { api } from "./api";

export async function getQuantidadeClientes() {
  try {
    const response = await api.get('totalclientes');

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

export async function getReceitaMes() {
  try {
    const response = await api.get('totalmes');

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

export async function getAtividades() {
  try {
    const response = await api.get('atividades');

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

export async function getAgendamentosPorDia() {
  try {
    const response = await api.get('agendamentospordia');

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

export async function modalidadesMaisPraticadas() {
  try {
    const response = await api.get('modalidadesmaispraticadas');

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
