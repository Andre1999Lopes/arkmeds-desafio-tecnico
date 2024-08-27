import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { DriverRepository } from '../../repositories/DriverRepository';

export class DeleteDriver {
	private static instance: DeleteDriver;

	private constructor(private driverRepository: DriverRepository) {}

	static getInstance(driverRepository: DriverRepository) {
		if (!this.instance) {
			this.instance = new DeleteDriver(driverRepository);
		}

		return this.instance;
	}

	async execute(driverId: string) {
		const driverExists = !!(await this.driverRepository.findById(driverId));

		if (!driverExists) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		return await this.driverRepository.delete(driverId);
	}
}
