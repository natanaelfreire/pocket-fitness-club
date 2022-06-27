import { ClienteRepository } from "../repositories/cliente-repository";

interface ListarClientesUseCaseRequest {
  clienteId?: string;
  cpf?: string;
  status: string;
}

export class ListarClientesUseCase {
  constructor (
    private clienteRepository: ClienteRepository,
  ) {}

  async execute(request: ListarClientesUseCaseRequest) {
    const filtros = {
      clienteId: request.clienteId,
      cpf: request.cpf ? request.cpf.replace(/\-/g, '').replace(/\./g, '').replace(/\s/g, '') : null,
      status: request.status,
    }

    const clientes = await this.clienteRepository.listar(filtros);

    return clientes;
  }
}