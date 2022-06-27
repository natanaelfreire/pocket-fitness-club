import express from 'express';
import { routes } from './routes';

process.env.TZ = 'America/Sao_Paulo';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Server is running!"));
