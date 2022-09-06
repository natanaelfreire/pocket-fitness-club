import { ReactNode, useContext, useState } from 'react';
import { Menu as Dropdown, Transition } from '@headlessui/react'
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { DarkModeToggle } from '../Toggle';

import { People } from '@styled-icons/bootstrap/People';
import { Dashboard } from '@styled-icons/remix-fill/Dashboard';
import { MenuFold } from '@styled-icons/remix-fill/MenuFold';
import { MenuUnfold } from '@styled-icons/remix-fill/MenuUnfold';
import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';
import { UserGroup } from '@styled-icons/heroicons-solid/UserGroup';
import { SportsMma } from '@styled-icons/material-outlined/SportsMma';
import { CalendarCheck } from '@styled-icons/bootstrap/CalendarCheck';
import { Receipt } from '@styled-icons/fluentui-system-filled/Receipt';
import { GraphUp } from '@styled-icons/bootstrap/GraphUp';
import { Payments } from '@styled-icons/material/Payments';
import { Search } from '@styled-icons/bootstrap/Search';
import { Person } from '@styled-icons/bootstrap/Person';
import { SettingsOutline } from '@styled-icons/evaicons-outline/SettingsOutline';
import { LogOutCircle } from '@styled-icons/boxicons-regular/LogOutCircle';

import logoSmall from '../../assets/images/logo-small.png';

import { Logout } from '../../services/AuthorizationService';
import { MenuItem } from '../../components/MenuItem';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';

type MenuProps = {
  children: ReactNode;
}

export function Menu({ children } : MenuProps) {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { width } = useWindowDimensions();
  const { user } = useContext(AuthContext);  

  const handleMenuItemClick = () => {
    if (width < 1000)
      setToggleSidebar(!toggleSidebar);
  }

  return (
    <div className={toggleSidebar ? 'toggle-sidebar' : ''}>
      <nav className="fixed top-0 right-0 w-full h-16 z-[1000] text-zinc-300 bg-slate-900 shadow-sm shadow-zinc-800 dark:bg-[#1b1b1b] flex items-center justify-between">
        <div className="flex items-center">
          <Link className='w-64 flex justify-center' to="/">
            <img src={logoSmall} style={{ objectFit: 'cover' }} width={150} alt="logo" />
          </Link>

          <button
            className="ml-4"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            {
              toggleSidebar ?
                <MenuUnfold size="28" title="Abrir menu" /> :
                <MenuFold size="28" title="Fechar menu" />
            }
          </button>

          {/* <div className='ml-5 bg-zinc-100 dark:bg-zinc-600 w-72 rounded-xl shadow-sm relative'>
            <input 
              className='bg-transparent px-2 py-2 w-72 rounded-xl placeholder:text-zinc-900 text-black dark:placeholder:text-zinc-300 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 dark:focus:ring-offset-zinc-900 focus:ring-[#12fecd]' 
              placeholder='Pesquisar...' 
            />
            <Search size="18" color='black' className='absolute top-2 right-2' />
          </div> */}
        </div>

        <div className="flex gap-5 items-center">
          {/* <DarkModeToggle title='Dark mode' /> */}

          <div className='mr-4 border rounded-full p-1 relative'>
            <Dropdown>
              <Dropdown.Button className='rounded-full w-6 h-6 flex items-center justify-center'>
                <Person size="20" />
              </Dropdown.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Dropdown.Items className="absolute right-0 mt-2 w-48 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg flex flex-col">
                  <Dropdown.Item>
                    <a
                      className='text-black dark:text-white text-lg px-2 py-1'
                    >
                      <div>{user?.nome}</div>
                      <small className="text-zinc-600">{user?.perfilAcesso}</small>
                    </a>
                  </Dropdown.Item>
                  <hr className='bg-zinc-300 dark:bg-zinc-700 h-[1px] border-none' />
                  <Dropdown.Item>
                      <a
                        className='text-black dark:text-zinc-300 text-sm flex items-center gap-2 hover:bg-blue-500 dark:hover:bg-zinc-900 hover:text-white p-2 m-1 rounded-md'
                        href="/account-settings"
                      >
                        <SettingsOutline size="18" />
                        Configurações
                      </a>
                  </Dropdown.Item>
                  <Dropdown.Item>
                      <a
                        className='text-black dark:text-zinc-300 text-sm flex items-center gap-2 hover:bg-blue-500 dark:hover:bg-zinc-900 hover:text-white p-2 m-1 rounded-md'
                        href="/"
                        onClick={Logout}
                      >
                        <LogOutCircle size="18" />
                        Sair
                      </a>
                  </Dropdown.Item>
                </Dropdown.Items>
              </Transition>
            </Dropdown>
          </div>
        </div>
      </nav>

      <aside className="sidebar fixed top-[4rem] w-64 h-full overflow-auto bg-slate-800 dark:bg-[#1f1f23]" style={{
        transition: 'all 0.3s'
      }}>
        <ul className="text-zinc-300 text-sm mt-5">
          <MenuItem Icon={Dashboard} label="Dashboard" path='dashboard' key='dashboard' onClick={handleMenuItemClick} />
          <MenuItem Icon={InfoCircle} label="Informações do Clube" path='infos' key='infos' onClick={handleMenuItemClick} />
          <MenuItem Icon={UserGroup} label="Professores" path='professor' key='professor' onClick={handleMenuItemClick} />
          <MenuItem Icon={SportsMma} label="Modalidades" path='modalidade' key='modalidade' onClick={handleMenuItemClick} />
          <MenuItem Icon={People} label="Clientes" path='cliente' key='cliente' onClick={handleMenuItemClick} />
          <MenuItem Icon={CalendarCheck} label="Calendário de Turma" path='calendario-turma' key='calendario-turma' onClick={handleMenuItemClick} />
          <MenuItem Icon={Receipt} label="Recebimentos" path='recebimento' key='recebimento' onClick={handleMenuItemClick} />
          <MenuItem Icon={GraphUp} label="Financeiro" path='financeiro' key='financeiro' onClick={handleMenuItemClick} />
          <MenuItem Icon={Payments} label="Pagamentos" path='pagamento' key='pagamento' onClick={handleMenuItemClick} />
        </ul>
      </aside>

      <main className="main ml-64 mt-16 py-5 px-7 text-zinc-800 dark:text-zinc-300">
        {children}
      </main>
    </div>
  );
}
