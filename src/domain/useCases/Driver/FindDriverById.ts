import { ValidationService } from '../../../application/services/ValidationService';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { DriverRepository } from '../../repositories/DriverRepository';

export class FindDriverById {
	private static instance: FindDriverById;

	private constructor(
		private driverRepository: DriverRepository,
		private validationService: ValidationService
	) {}

	static getInstance(
		driverRepository: DriverRepository,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new FindDriverById(driverRepository, validationService);
		}

		return this.instance;
	}

	async execute(driverId: string) {
		this.validationService.validateUuid(driverId);
		const driver = await this.driverRepository.findById(driverId);

		if (!driver) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		return driver;
	}
}
