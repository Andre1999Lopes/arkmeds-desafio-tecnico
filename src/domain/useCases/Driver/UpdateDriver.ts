import { DriverDTO } from '../../../application/dtos/DriverDto';
import { ValidationService } from '../../../application/services/ValidationService';
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
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

	async execute(id: string, driver: DriverDTO) {
		const driverExists = !!(await this.driverRepository.findById(id));

		if (!driverExists) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		this.validationService.validateUser(driver, false);

		if (driver.cpf) {
			const driverWithCpf = !!(await this.driverRepository.findByCpf(
				driver.cpf
			));

			if (driverWithCpf) {
				throw new UserAlreadyExistsError(
					'A driver with this CPF already exists'
				);
			}
		}

		if (driver.email) {
			const driverWithEmail = !!(await this.driverRepository.findByEmail(
				driver.email
			));

			if (driverWithEmail) {
				throw new UserAlreadyExistsError(
					'A driver with this email already exists'
				);
			}
		}

		if (driver.licenseNumber) {
			const driverWithLicenseNumber =
				!!(await this.driverRepository.findByLicenseNumber(
					driver.licenseNumber
				));

			if (driverWithLicenseNumber) {
				throw new UserAlreadyExistsError(
					'A driver with this license number already exists'
				);
			}
		}

		const updatedDriver = this.driverRepository.update(id, driver);

		return updatedDriver;
	}
}
