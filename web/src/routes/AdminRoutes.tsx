import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Menu } from '../components/Menu';

import { Home } from '../pages/Home';
import { Cliente } from '../pages/Cliente';
import { InformacoesClube } from '../pages/InformacoesClube';
import { Modalidade } from '../pages/Modalidade';

export default function OtherRoutes() {
  return (
    <BrowserRouter>
        <Menu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/infos" element={<InformacoesClube />} />
            <Route path="/professor" element={<Home />} />
            <Route path="/modalidade" element={<Modalidade />} />            
            <Route path="/cliente" element={<Cliente />} />
            <Route path="/calendario-turma" element={<Home />} />
            <Route path="/recebimento" element={<Home />} />
            <Route path="/financeiro" element={<Home />} />
            <Route path="/pagamento" element={<Home />} />
          </Routes>
        </Menu>
    </BrowserRouter>
  );
}