import { ReactNode, createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { signIn } from '../services/AuthorizationService';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  login(user: string, password: string): Promise<{
    sucesso: boolean;
    mensagem: string;
  }>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type User = {
  id: string;
  nome: string;
  perfilAcesso: 'Admin' | 'Aluno' | 'Atendente' | 'Professor'
}

// Type Guard
function isUser(obj: any): obj is User {
  return (obj as User).id !== undefined && (obj as User).nome !== undefined && (obj as User).perfilAcesso !== undefined;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children } : AuthProviderProps) => {
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const storageUser = localStorage.getItem('@pocket:user');
    const decoded = storageUser ? atob(storageUser) : '{}';

    try {
      const dados = JSON.parse(decoded);

      if (isUser(dados))
        setUser(dados);
      else
        setUser(null);

    } catch (error) {
      setUser(null);
    }
    
  }, []);

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    return (
      <div className='flex items-center justify-center'>
        <h2 className='text-2xl'>Carregando...</h2>
      </div>
    );
  }

  async function login(user: string, password: string) {
    const response = await signIn(user, password);

    if (response.sucesso) {
      api.defaults.headers.common['perfil'] = response.data? response.data.perfilAcesso : '';

      const dados = JSON.stringify(response.data);
      const encodedData = btoa(dados);
      localStorage.setItem('@pocket:user', encodedData);

      setUser(response.data);

      return {
        sucesso: true,
        mensagem: response.mensagem
      }
    }
    else return {
      sucesso: false,
      mensagem: response.mensagem
    }
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, login}}>
      {children}
    </AuthContext.Provider>
  );
 };

export default AuthContext;