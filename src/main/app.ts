import express from 'express';
import { router } from '../infra/http/routes/index.routes';

const app = express();

app.use(express.json());
app.use(router);

export default app;
