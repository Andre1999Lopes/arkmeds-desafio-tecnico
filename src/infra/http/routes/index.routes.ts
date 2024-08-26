import { Request, Response, Router } from 'express';
import { driverRouter } from './driver.routes';
import { passengerRouter } from './passenger.routes';

const router = Router();

router.get('/', (req: Request, res: Response) =>
	res.status(200).json({ message: 'Healthy' })
);

router.use('/passenger', passengerRouter);
router.use('/driver', driverRouter);

export { router };
