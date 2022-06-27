import { ClienteRepository } from "../repositories/cliente-repository";

export class MostrarClienteUseCase {
  constructor(
    private clienteRepository: ClienteRepository,
  ) {}

  async execute(clienteId: string) {
    const cliente = await this.clienteRepository.getClientePorId(clienteId);

    if (cliente == null)
      throw new Error("Cliente não encontrado");

    return cliente;
  }
}
