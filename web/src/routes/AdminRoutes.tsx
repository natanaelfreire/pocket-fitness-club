import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Menu } from '../components/Menu';

import { Home } from '../pages/Home';
import { Cliente } from '../pages/Cliente';
import { InformacoesClube } from '../pages/InformacoesClube';
import { Modalidade } from '../pages/Modalidade';
import { Professor } from '../pages/Professor';
import { CalendarioTurma } from '../pages/CalendarioTurma';
import { Recebimento } from '../pages/Recebimento';
import { Pagamento } from '../pages/Pagamento';
import { Dashboard } from '../pages/Dashboard';
import { Financeiro } from '../pages/Financeiro';

export default function OtherRoutes() {
  return (
    <BrowserRouter>
        <Menu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/infos" element={<InformacoesClube />} />
            <Route path="/professor" element={<Professor />} />
            <Route path="/modalidade" element={<Modalidade />} />            
            <Route path="/cliente" element={<Cliente />} />
            <Route path="/calendario-turma" element={<CalendarioTurma />} />
            <Route path="/recebimento" element={<Recebimento />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/pagamento" element={<Pagamento />} />
          </Routes>
        </Menu>
    </BrowserRouter>
  );
}