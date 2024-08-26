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
		const user = await this.driverRepository.findById(driverId);

		return user;
	}
}
