import { Request, Response, Router } from 'express';
import { driverRouter } from './driver.routes';
import { fareRouter } from './fare.routes';
import { passengerRouter } from './passenger.routes';

const router = Router();

router.get('/', (_req: Request, res: Response) =>
	res.status(200).json({ message: 'Healthy' })
);

router.use('/passenger', passengerRouter);
router.use('/driver', driverRouter);
router.use('/fare', fareRouter);

export { router };
