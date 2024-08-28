import { ValidationService } from '../../../application/services/ValidationService';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { DriverRepository } from '../../repositories/DriverRepository';

export class DeleteDriver {
	private static instance: DeleteDriver;

	private constructor(
		private driverRepository: DriverRepository,
		private validationService: ValidationService
	) {}

	static getInstance(
		driverRepository: DriverRepository,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new DeleteDriver(driverRepository, validationService);
		}

		return this.instance;
	}

	async execute(driverId: string) {
		this.validationService.validateUuid(driverId);
		const driverExists = !!(await this.driverRepository.findById(driverId));

		if (!driverExists) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		return await this.driverRepository.delete(driverId);
	}
}
