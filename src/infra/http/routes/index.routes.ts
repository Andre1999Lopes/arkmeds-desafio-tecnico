import { Router } from 'express';
import { passengerRouter } from './passenger.routes';

const router = Router();

router.use('/passenger', passengerRouter);

export { router };
