export interface ClienteDadosCriacao {
  nome: string;
	cpf: string;
	dataNascimento: string;
	endereco: string;
	telefone: string;
	dataMensalidade: string;
	valorMensalidade: number;
	ativo: boolean;
}

export interface ClienteDados {
  id: string;
  nome: string;
	cpf: string;
	dataNascimento: string;
	endereco: string;
	telefone: string;
	dataMensalidade: string;
	valorMensalidade: number;
	ativo: boolean;
}

export interface FiltrosListarClientes {
	clienteId?: string | null;
	cpf?: string | null;
	status?: string | null;
}

export interface ClienteRepository {
	getClientePorCPF: (cpf: string) => Promise<ClienteDados | null>
	validaCPFUnico: (cpf: string, id?: string) => Promise<boolean>;
  criar: (dados: ClienteDadosCriacao) => Promise<void>;
  getClientePorId: (id: string) => Promise<ClienteDados | null>;
  atualizar: (dados: ClienteDados) => Promise<void>;
  excluir: (id: string) => Promise<void>;
  listar: (filtros: FiltrosListarClientes) => Promise<ClienteDados[]>;
}