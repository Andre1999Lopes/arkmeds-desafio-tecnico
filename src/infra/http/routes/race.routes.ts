import { Router } from 'express';
import { AcceptRaceUseCase } from '../../../domain/useCases/Race/AcceptRaceUseCase';
import { KafkaProducer } from '../../queue/producer/KafkaProducer';
import { RaceController } from '../controllers/RaceController';

const raceRouter = Router();

const producer = KafkaProducer.getInstance();
const acceptRaceUseCase = AcceptRaceUseCase.getInstance(producer);
const controller = RaceController.getInstance(acceptRaceUseCase);

raceRouter.post('/', controller.acceptRace);

export { raceRouter };
