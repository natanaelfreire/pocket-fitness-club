import express, { Request, Response, NextFunction } from 'express';
import { routes } from './routes';
import cors from 'cors';
import { AtividadesSistemaController } from './controllers/AtividadesSistemaController';

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}))

app.use((req: Request, res: Response, next: NextFunction) => {  
  res.on('finish', async () => {
    if (req.path.split('/').length === 2 && req.method === 'POST' && res.statusCode.toString().startsWith("2")) {
      const funcionalidade = req.path.split('/')[1];
      let descricao = `Novo registro de ${funcionalidade} criado`;

      const atividadesSistemaController = new AtividadesSistemaController();

      if (funcionalidade === 'cliente') {
        descricao = `Cliente novo ${req.body.nome} adicionado`;
      }

      if (funcionalidade === 'recebimento') {
        descricao = `Recebimento gerado no valor de R$ ${req.body.valor}`;
      }

      await atividadesSistemaController.criar(descricao);
    }
  })

  next();
})

app.use(routes);



app.listen(3333, () => console.log("Server is running!"));
