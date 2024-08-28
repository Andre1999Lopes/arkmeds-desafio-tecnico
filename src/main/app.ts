import express, { NextFunction, Request, Response } from 'express';
import { router } from '../infra/http/routes/index.routes';

const app = express();

app.use(express.json());
app.use(router);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	console.log(JSON.stringify('An error ocurred:', error), null, 2);

	return res.status(500).json({ message: 'Internal server error' });
});

export default app;
