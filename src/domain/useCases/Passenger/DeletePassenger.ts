import { ValidationService } from '../../../application/services/ValidationService';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { PassengerRepository } from '../../repositories/PassengerRepository';

export class DeletePassenger {
	private static instance: DeletePassenger;

	private constructor(
		private passengerRepository: PassengerRepository,
		private validationService: ValidationService
	) {}

	static getInstance(
		passengerRepository: PassengerRepository,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new DeletePassenger(
				passengerRepository,
				validationService
			);
		}

		return this.instance;
	}

	async execute(passengerId: string) {
		this.validationService.validateUuid(passengerId);
		const driverExists = !!(await this.passengerRepository.findById(
			passengerId
		));

		if (!driverExists) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		return await this.passengerRepository.delete(passengerId);
	}
}
