import { ClienteRepository } from "../repositories/cliente-repository";

export class DeletarClienteUseCase {
  constructor(
    private clienteRepositry: ClienteRepository,
  ) {}

  async execute(clienteId: string) {
    await this.clienteRepositry.excluir(clienteId);
  }
}
