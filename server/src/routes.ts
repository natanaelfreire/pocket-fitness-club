import express from 'express';
import { AuthController } from './controllers/AuthController';
import { AgendamentoController } from './controllers/AgendamentoController';
import { ClienteController } from './controllers/ClienteController';
import { ColaboradorController } from './controllers/ColaboradorController';
import { ModalidadeController } from './controllers/ModalidadeController';
import { TurmaController } from './controllers/TurmaController';
import { InfoController } from './controllers/InfoController';
import { RecebimentoController } from './controllers/RecebimentoController';
import { PagamentoController } from './controllers/PagamentoController';
import { AtividadesSistemaController } from './controllers/AtividadesSistemaController';
import { FinanceiroController } from './controllers/FinanceiroController';

const routes = express.Router();
const authController = new AuthController();
const clienteController = new ClienteController();
const colaboradorController = new ColaboradorController();
const modalidadeController = new ModalidadeController();
const turmaController = new TurmaController();
const agendamentoController = new AgendamentoController();
const infoController = new InfoController();
const recebimentoController = new RecebimentoController();
const pagamentoController = new PagamentoController();
const atividadesSistemaController = new AtividadesSistemaController();
const financeiroController = new FinanceiroController();

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
routes.get('/modalidadesmaispraticadas', modalidadeController.modalidadesMaisPraticadas);

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
routes.get('/agendamentospordia', agendamentoController.agendamentosPorDia);

routes.post('/recebimento', recebimentoController.criar);
routes.get('/recebimento', recebimentoController.listar);
routes.put('/recebimento', recebimentoController.atualizar);
routes.get('/recebimento/:id', recebimentoController.mostrar);
routes.delete('/recebimento/:id', recebimentoController.deletar);
routes.get('/totalmes', recebimentoController.totalMes);

routes.post('/pagamento', pagamentoController.criar);
routes.get('/pagamento', pagamentoController.listar);
routes.put('/pagamento', pagamentoController.atualizar);
routes.get('/pagamento/:id', pagamentoController.mostrar);
routes.delete('/pagamento/:id', pagamentoController.deletar);

routes.get('/atividades', atividadesSistemaController.listar);
routes.get('/totalclientes', atividadesSistemaController.totalClientes);

routes.get('/financeiro/balancoanual', financeiroController.balancoAnual);
routes.get('/financeiro/movimentacoesrecentes', financeiroController.movimentacoesRecentes);

routes.get('/', (req, res) => {
  return res.send("Eae");
});

export { routes };
