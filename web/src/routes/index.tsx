import { useContext } from 'react';

import AuthContext from '../contexts/auth';

import SignRoutes from './SignRoutes';
import AdminRoutes from './AdminRoutes';
import ClientRoutes from './ClientRoutes';

const Routes = () => {
  const { signed, user } = useContext(AuthContext);

  return signed ? 
    (user?.perfilAcesso === 'Aluno' ? <ClientRoutes /> : <AdminRoutes />) : 
    <SignRoutes />;
}

export default Routes;
