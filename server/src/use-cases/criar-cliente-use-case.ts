import { ClienteRepository } from "../repositories/cliente-repository";

interface CriarClienteUseCaseRequest {
  nome: string;
	cpf: string;
	dataNascimento: string;
	endereco: string;
	telefone: string;
	dataMensalidade: string;
	valorMensalidade: number;
	ativo: boolean;
}

export class CriarClienteUseCase {
  constructor(
    private clienteRepository: ClienteRepository,
  ) {}

  async execute(request: CriarClienteUseCaseRequest) {
    const {
      nome,
      cpf,
      dataNascimento,
      endereco,
      telefone,
      dataMensalidade,
      valorMensalidade,
      ativo
    } = request;

    if (!nome) {
      throw new Error("Nome é obrigatório.");
    }

    if (!cpf) {
      throw new Error("CPF é obrigatório.");
    }

    const cpfSemFormatacao = cpf.replace(/\-/g, '').replace(/\./g, '').replace(/\s/g, '');
    const cpfUnico = await this.clienteRepository.validaCPFUnico(cpfSemFormatacao)

    if (!cpfUnico) {
      throw new Error("CPF já cadastrado.");
    }

    if (!dataNascimento) {
      throw new Error("Data de Nascimento é obrigatório.");
    }

    if (!valorMensalidade) {
      throw new Error("Valor da Mensalidade é obrigatório.");
    }

    await this.clienteRepository.criar({
      nome, 
      cpf: cpfSemFormatacao,
      dataNascimento,
      endereco,
      telefone,
      dataMensalidade,
      valorMensalidade,
      ativo
    })
  }
}
