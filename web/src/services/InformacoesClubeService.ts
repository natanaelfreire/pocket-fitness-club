import { AxiosError } from "axios";
import { api } from "./api";

interface SalvarInformacoesClube {
  nome: string;
  endereco: string;
  horarios: string;
  telefone: string;
  facebook: string;
  instagram: string;
}

export async function salvarInformacoesClube(dados: SalvarInformacoesClube) {
  try {
    await api.post('info', {
      nome: dados.nome,
      endereco: dados.endereco,
      horarios: dados.horarios,
      telefone: dados.telefone,
      facebook: dados.facebook,
      instagram: dados.instagram
    })

    return {
      sucesso: true,
      data: null,
      mensagem: 'Informações salvas com sucesso!'
    }
    
  } catch (error: AxiosError | Error | any) {
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

export async function carregarInformacoesClube() {
  try {
    const response = await api.get('info');

    return {
      sucesso: true,
      data: response.data,
      mensagem: ''
    }
    
  } catch (error: AxiosError | Error | any) {
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
