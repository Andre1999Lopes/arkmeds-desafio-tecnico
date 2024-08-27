import { Router } from 'express';
import { ValidationService } from '../../../application/services/ValidationService';
import { CreateDriver } from '../../../domain/useCases/Driver/CreateDriver';
import { DeleteDriver } from '../../../domain/useCases/Driver/DeleteDriver';
import { FindAllDrivers } from '../../../domain/useCases/Driver/FindAllDrivers';
import { FindDriverById } from '../../../domain/useCases/Driver/FindDriverById';
import { UpdateDriver } from '../../../domain/useCases/Driver/UpdateDriver';
import { DriverRepositoryImpl } from '../../database/DriverRepositoryImpl';
import { DriverController } from '../controllers/DriverController';

const driverRouter = Router();

const driverRepository = DriverRepositoryImpl.getInstance();
const validationService = ValidationService.getInstance();

const createDriverUseCase = CreateDriver.getInstance(
	driverRepository,
	validationService
);
const findAllDriversUseCase = FindAllDrivers.getInstance(driverRepository);
const findDriverByIdUseCase = FindDriverById.getInstance(driverRepository);

const updateDriverUseCase = UpdateDriver.getInstance(
	driverRepository,
	validationService
);
const deleteDriverUseCase = DeleteDriver.getInstance(driverRepository);

const controller = DriverController.getInstance(
	createDriverUseCase,
	findAllDriversUseCase,
	findDriverByIdUseCase,
	updateDriverUseCase,
	deleteDriverUseCase
);

driverRouter
	.post('/', controller.create)
	.get('/', controller.findAll)
	.get('/:id', controller.findById)
	.put('/:id', controller.update)
	.delete('/:id', controller.delete);

export { driverRouter };
