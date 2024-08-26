import { ValidationService } from '../../../application/services/ValidationService';
import { Driver } from '../../entities/Driver';
import { DriverRepository } from '../../repositories/DriverRepository';

export class UpdateDriver {
	private static instance: UpdateDriver;

	private constructor(
		private driverRepository: DriverRepository,
		private validationService: ValidationService
	) {}

	static getInstance(
		driverRepository: DriverRepository,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new UpdateDriver(driverRepository, validationService);
		}

		return this.instance;
	}

	async execute(driver: Driver) {
		this.validationService.validatePassengerOrDriver({
			cpf: driver.cpf,
			email: driver.email,
			phoneNumber: driver.phoneNumber,
			birthDate: driver.birthDate.toISOString()
		});

		const driverWithCpf = await this.driverRepository.findByCpf(driver.cpf);

		if (!!driverWithCpf) {
			throw new Error('A driver with this CPF already exists');
		}

		const driverWithEmail = await this.driverRepository.findByEmail(
			driver.email
		);

		if (!!driverWithEmail) {
			throw new Error('A driver with this email already exists');
		}

		const driverWithLicenseNumber =
			await this.driverRepository.findByLicenseNumber(driver.licenseNumber);

		if (!!driverWithLicenseNumber) {
			throw new Error('A driver with this license number already exists');
		}

		const updatedDriver = this.driverRepository.update(driver);

		return updatedDriver;
	}
}
