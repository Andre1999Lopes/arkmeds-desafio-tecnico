import { CreatePassengerDTO } from '../../../application/dtos/CreatePassengerDto';
import { ValidationService } from '../../../application/services/ValidationService';
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

	async execute(passenger: CreatePassengerDTO) {
		this.validationService.validatePassengerOrDriver({
			cpf: passenger.cpf,
			email: passenger.email,
			phoneNumber: passenger.phoneNumber,
			birthDate: passenger.birthDate
		});

		const passengerWithCpf = await this.passengerRepository.findByCpf(
			passenger.cpf
		);

		if (!!passengerWithCpf) {
			throw new Error('A passenger with this CPF already exists');
		}

		const passengerWithEmail = await this.passengerRepository.findByEmail(
			passenger.email
		);

		if (!!passengerWithEmail) {
			throw new Error('A passenger with this email already exists');
		}

		const newPassenger = await this.passengerRepository.create(passenger);

		return newPassenger;
	}
}
