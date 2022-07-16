import express from 'express';
import { AuthController } from './controllers/AuthController';
import { AgendamentoController } from './controllers/AgendamentoController';
import { ClienteController } from './controllers/ClienteController';
import { ColaboradorController } from './controllers/ColaboradorController';
import { ModalidadeController } from './controllers/ModalidadeController';
import { TurmaController } from './controllers/TurmaController';
import { InfoController } from './controllers/InfoController';

const routes = express.Router();
const authController = new AuthController();
const clienteController = new ClienteController();
const colaboradorController = new ColaboradorController();
const modalidadeController = new ModalidadeController();
const turmaController = new TurmaController();
const agendamentoController = new AgendamentoController();
const infoController = new InfoController();

routes.post('/authorization', authController.signIn);

routes.post('/info', infoController.salvar);
routes.get('/info', infoController.buscar);

routes.post('/cliente', clienteController.criar);
routes.post('/cliente/listagem', clienteController.listar);
routes.put('/cliente', clienteController.atualizar);
routes.get('/cliente/:id', clienteController.mostrar);
routes.delete('/cliente/:id', clienteController.deletar);

routes.post('/colaborador', colaboradorController.criar);
routes.get('/colaborador', colaboradorController.listar);
routes.put('/colaborador', colaboradorController.atualizar);
routes.get('/colaborador/:id', colaboradorController.mostrar);
routes.delete('/colaborador/:id', colaboradorController.deletar);

routes.post('/modalidade', modalidadeController.criar);
routes.get('/modalidade', modalidadeController.listar);
routes.put('/modalidade', modalidadeController.atualizar);
routes.get('/modalidade/:id', modalidadeController.mostrar);
routes.delete('/modalidade/:id', modalidadeController.deletar);

routes.post('/turma', turmaController.criar);
routes.get('/turma', turmaController.listar);
routes.put('/turma', turmaController.atualizar);
routes.get('/turma/:id', turmaController.mostrar);
routes.delete('/turma/:id', turmaController.deletar);

routes.post('/agendamento', agendamentoController.criar);
routes.get('/agendamento', agendamentoController.listar);
routes.patch('/agendamento/cancelar/:id', agendamentoController.cancelar);
routes.get('/agendamento/:id', agendamentoController.mostrar);
// routes.delete('/agendamento/:id', turmaController.deletar);

routes.get('/', (req, res) => {
  return res.send("Eae");
});

export { routes };
