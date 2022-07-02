import express from 'express';
import { ClienteController } from './controllers/ClienteController';
import { ColaboradorController } from './controllers/ColaboradorController';

const routes = express.Router();
const clienteController = new ClienteController();
const colaboradorController = new ColaboradorController();

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

routes.get('/', (req, res) => {
  return res.send("Eae");
});

export { routes };
