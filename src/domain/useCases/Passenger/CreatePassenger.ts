import { PassengerDTO } from '../../../application/dtos/PassengerDTO';
import { ValidationService } from '../../../application/services/ValidationService';
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';
import { PassengerRepository } from '../../repositories/PassengerRepository';

export class CreatePassenger {
	private static instance: CreatePassenger;

	private constructor(
		private passengerRepository: PassengerRepository,
		private validationService: ValidationService
	) {}

	static getInstance(
		passengerRepository: PassengerRepository,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new CreatePassenger(
				passengerRepository,
				validationService
			);
		}

		return this.instance;
	}

	async execute(passenger: PassengerDTO) {
		this.validationService.validateUser(passenger, true);

		const passengerWithCpf = await this.passengerRepository.findByCpf(
			passenger.cpf
		);

		if (!!passengerWithCpf) {
			throw new UserAlreadyExistsError(
				'A passenger with this CPF already exists'
			);
		}

		const passengerWithEmail = await this.passengerRepository.findByEmail(
			passenger.email
		);

		if (!!passengerWithEmail) {
			throw new UserAlreadyExistsError(
				'A passenger with this email already exists'
			);
		}

		const newPassenger = await this.passengerRepository.create(passenger);

		return newPassenger;
	}
}
