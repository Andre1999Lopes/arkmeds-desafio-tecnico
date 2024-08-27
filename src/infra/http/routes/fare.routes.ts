import { Router } from 'express';
import { ValidationService } from '../../../application/services/ValidationService';
import { CalculateFareUseCase } from '../../../domain/useCases/Fare/CalculateFareUseCase';
import { FareController } from '../controllers/FareController';

const fareRouter = Router();

const validationService = ValidationService.getInstance();
const calculateFareUseCase =
	CalculateFareUseCase.getInstance(validationService);

const controller = FareController.getInstance(calculateFareUseCase);

fareRouter.post('/', controller.getFare);

export { fareRouter };
