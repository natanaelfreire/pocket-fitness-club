import express from 'express';
import { ClienteController } from './controllers/ClienteController';
import { ColaboradorController } from './controllers/ColaboradorController';
import { ModalidadeController } from './controllers/ModalidadeController';
import { TurmaController } from './controllers/TurmaController';

const routes = express.Router();
const clienteController = new ClienteController();
const colaboradorController = new ColaboradorController();
const modalidadeController = new ModalidadeController();
const turmaController = new TurmaController();

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

routes.get('/', (req, res) => {
  return res.send("Eae");
});

export { routes };
