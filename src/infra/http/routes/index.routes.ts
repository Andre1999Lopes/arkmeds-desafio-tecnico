import { Request, Response, Router } from 'express';
import { passengerRouter } from './passenger.routes';

const router = Router();

router.get('/', (req: Request, res: Response) =>
	res.status(200).json({ message: 'Healthy' })
);

router.use('/passenger', passengerRouter);

export { router };
