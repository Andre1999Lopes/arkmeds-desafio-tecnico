import { DriverRepository } from '../../repositories/DriverRepository';

export class FindAllDrivers {
	private static instance: FindAllDrivers;

	private constructor(private driverRepository: DriverRepository) {}

	static getInstance(driverRepository: DriverRepository) {
		if (!this.instance) {
			this.instance = new FindAllDrivers(driverRepository);
		}

		return this.instance;
	}

	async execute() {
		const driversList = this.driverRepository.findAll();

		return driversList;
	}
}
