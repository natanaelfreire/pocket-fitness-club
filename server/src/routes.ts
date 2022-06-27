import express from 'express';
import { ClienteController } from './controllers/ClienteController';

const routes = express.Router();
const clienteController = new ClienteController();

routes.post('/cliente', clienteController.criar);
routes.post('/cliente/listagem', clienteController.listar);
routes.put('/cliente', clienteController.atualizar);
routes.get('/cliente/:id', clienteController.mostrar);
routes.delete('/cliente/:id', clienteController.deletar);

routes.get('/', (req, res) => {
  return res.send("Eae");
});

export { routes };
