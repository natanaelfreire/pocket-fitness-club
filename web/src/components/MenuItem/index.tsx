import { StyledIcon } from '@styled-icons/styled-icon';
import { Link, useLocation } from 'react-router-dom';

import './styles.css';

type MenuItemProps = {
  Icon: StyledIcon,
  path: string,
  label: string,
  onClick?: () => void;
}

export const MenuItem = ({ Icon, label, path, onClick } : MenuItemProps) => {
  const location = useLocation();

  return (
    <li className={`${location.pathname === '/' + path && 'active-item'} mx-2 my-1 relative`} onClick={onClick}>
      <Link className={`${location.pathname === '/' + path ? 'active hover:text-zinc-700 dark:hover:text-[#12fecd]' : 'hover:text-[#12fecd]'} flex gap-3 items-center rounded-md px-4 py-3`} to={path}>
        <Icon size="18" title={label} /> <span>{label}</span>
      </Link>
    </li>
  );
}
