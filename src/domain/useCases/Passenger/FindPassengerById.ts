import { ValidationService } from '../../../application/services/ValidationService';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { PassengerRepository } from '../../repositories/PassengerRepository';

export class FindPassengerById {
	private static instance: FindPassengerById;

	private constructor(
		private passengerRepository: PassengerRepository,
		private validationService: ValidationService
	) {}

	static getInstance(
		passengerRepository: PassengerRepository,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new FindPassengerById(
				passengerRepository,
				validationService
			);
		}

		return this.instance;
	}

	async execute(passengerId: string) {
		this.validationService.validateUuid(passengerId);
		const passenger = await this.passengerRepository.findById(passengerId);

		if (!passenger) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		return passenger;
	}
}
