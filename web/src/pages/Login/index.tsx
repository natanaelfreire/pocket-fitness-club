import ManTraining from '../../assets/images/man-training.png';
import Logo from '../../assets/images/logo.png';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';

import { Spinner2 } from '@styled-icons/icomoon/Spinner2';

export function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputSenha, setInputSenha] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const { login } = useContext(AuthContext);
  
  const fazerLogin = async () => {
    setLoginLoading(true);
    setMensagemErro('');

    const response = await login(inputEmail, inputSenha);

    if (response.sucesso === false) {
      setMensagemErro(response.mensagem);
    }

    setLoginLoading(false);
  }

  return (
    <div className="flex justify-between bg-slate-900">
      <div className='w-3/5 flex flex-col items-center'>
        <div>
          <img src={Logo} className="object-cover" />
        </div>

        <div className='bg-white w-60 h-72 py-3 px-6 rounded-md'>
          <h2 className='text-2xl font-semibold mb-4'>Login</h2>
          <div className='mb-2'>
            <label
              htmlFor='input-email'
              className='text-sm'
            >
              Email
            </label>
            <input
              id="input-email"
              className='mt-1 px-2 border border-zinc-300 py-1 rounded-md w-full placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white'
              placeholder='Seu email ou usuário'
              onInput={e => setInputEmail(e.currentTarget.value)}
            />
          </div>

          <div className='mb-3'>
            <label
              htmlFor='input-senha'
              className='text-sm'
            >
              Senha
            </label>
            <input
              id='input-senha'
              className='mt-1 px-2 border border-zinc-300 py-1 rounded-md w-full placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white'
              placeholder='Sua senha'
              type='password'
              onInput={e => setInputSenha(e.currentTarget.value)}
            />
          </div>

          <button
            disabled={loginLoading}
            onClick={fazerLogin}
            className='w-full flex disabled:bg-blue-400 justify-center items-center shadow-sm text-white bg-blue-800 hover:bg-blue-700 transition-colors py-[0.35rem] rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white'
          >
            {
              loginLoading ?
              <Spinner2 size="24" className='animate-spin'/> :
              'Login'
            }            
          </button>

          {/* <div className='flex justify-end items-center mt-2'>
            <button className='text-xs text-blue-800'>Esqueceu minha senha?</button>
          </div> */}

          <div className='text-sm text-rose-600'>
            <span>{mensagemErro}</span>
          </div>
        </div>
      </div>

      <div>
        <img src={ManTraining} style={{
          height: '100vh'
        }} />
      </div>
    </div>
  );
}