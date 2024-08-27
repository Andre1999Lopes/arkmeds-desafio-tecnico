import { Router } from 'express';
import { ValidationService } from '../../../application/services/ValidationService';
import { CreatePassenger } from '../../../domain/useCases/Passenger/CreatePassenger';
import { DeletePassenger } from '../../../domain/useCases/Passenger/DeletePassenger';
import { FindAllPassengers } from '../../../domain/useCases/Passenger/FindAllPassengers';
import { FindPassengerById } from '../../../domain/useCases/Passenger/FindPassengerById';
import { UpdatePassenger } from '../../../domain/useCases/Passenger/UpdatePassenger';
import { PassengerRepositoryImpl } from '../../database/PassengerRepositoryImpl';
import { PassengerController } from '../controllers/PassengerController';

const passengerRouter = Router();

const passengerRepository = PassengerRepositoryImpl.getInstance();
const validationService = ValidationService.getInstance();

const createPassengerUseCase = CreatePassenger.getInstance(
	passengerRepository,
	validationService
);
const findAllPassengersUseCase =
	FindAllPassengers.getInstance(passengerRepository);
const findPassengerByIdUseCase =
	FindPassengerById.getInstance(passengerRepository);

const updatePassengerUseCase = UpdatePassenger.getInstance(
	passengerRepository,
	validationService
);
const deletePassengerUseCase = DeletePassenger.getInstance(passengerRepository);

const controller = PassengerController.getInstance(
	createPassengerUseCase,
	findAllPassengersUseCase,
	findPassengerByIdUseCase,
	updatePassengerUseCase,
	deletePassengerUseCase
);

passengerRouter
	.post('/', controller.create)
	.get('/', controller.findAll)
	.get('/:id', controller.findById)
	.put('/:id', controller.update)
	.delete('/:id', controller.delete);

export { passengerRouter };
