import { CreateDriverDTO } from '../../../application/dtos/CreateDriverDto';
import { ValidationService } from '../../../application/services/ValidationService';
import { DriverRepository } from '../../repositories/DriverRepository';

export class CreateDriver {
	private static instance: CreateDriver;

	private constructor(
		private driverRepository: DriverRepository,
		private validationService: ValidationService
	) {}

	static getInstance(
		driverRepository: DriverRepository,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new CreateDriver(driverRepository, validationService);
		}

		return this.instance;
	}

	async execute(driver: CreateDriverDTO) {
		this.validationService.validatePassengerOrDriver({
			cpf: driver.cpf,
			email: driver.email,
			phoneNumber: driver.phoneNumber,
			birthDate: driver.birthDate
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

		const newDriver = await this.driverRepository.create(driver);

		return newDriver;
	}
}
