import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { DriverRepository } from '../../repositories/DriverRepository';

export class FindDriverById {
	private static instance: FindDriverById;

	private constructor(private driverRepository: DriverRepository) {}

	static getInstance(driverRepository: DriverRepository) {
		if (!this.instance) {
			this.instance = new FindDriverById(driverRepository);
		}

		return this.instance;
	}

	async execute(driverId: string) {
		const driver = await this.driverRepository.findById(driverId);

		if (!driver) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		return driver;
	}
}
