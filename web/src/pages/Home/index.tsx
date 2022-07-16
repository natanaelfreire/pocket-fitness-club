import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import LogoOnly from '../../assets/images/logo-only.png';

export function Home() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('pt-BR'));
  let idInterval = 0;

  useEffect(() => {
    idInterval = setInterval(() => {
      const horaAtual = new Date().toLocaleTimeString('pt-BR');

      setTime(horaAtual);
    }, 1000)

    return () => clearInterval(idInterval);
  }, [])

  return (
    <>
      <Helmet title='Home - Pocket Fitness Club' />
      <div className='h-screen flex flex-col items-center gap-10 mt-16'>
        <h1 className='flex items-end gap-5'>
          <span className='text-3xl text-zinc-900 dark:text-zinc-300' style={{ fontFamily: 'Monospace' }}>{time}</span>
          <small className='text-sm'>Sobral, Ceará</small>
        </h1>
        
        <img src={LogoOnly} className="object-cover h-56 mb-10"  />
        <a className='text-blue-500 hover:text-blue-800 transition-colors' href="https://github.com/natanaelfreire">@natanaelfreire</a>
      </div>
    </>
  )
}