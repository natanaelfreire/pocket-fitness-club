import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AlunoAgendamento } from '../pages/AlunoAgendamento';

export default function OtherRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlunoAgendamento />} />
      </Routes>
    </BrowserRouter>
  );
}