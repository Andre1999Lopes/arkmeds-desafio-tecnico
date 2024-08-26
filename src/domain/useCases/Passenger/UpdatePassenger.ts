import { ValidationService } from '../../../application/services/ValidationService';
import { Passenger } from '../../entities/Passenger';
import { PassengerRepository } from '../../repositories/PassengerRepository';

export class UpdatePassenger {
	private static instance: UpdatePassenger;

	private constructor(
		private passengerRepository: PassengerRepository,
		private validationService: ValidationService
	) {}

	static getInstance(
		passengerRepository: PassengerRepository,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new UpdatePassenger(
				passengerRepository,
				validationService
			);
		}

		return this.instance;
	}

	async execute(passenger: Passenger) {
		this.validationService.validatePassengerOrDriver({
			cpf: passenger.cpf,
			email: passenger.email,
			phoneNumber: passenger.phoneNumber,
			birthDate: passenger.birthDate.toISOString()
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

		const updatedPassenger = this.passengerRepository.update(passenger);

		return updatedPassenger;
	}
}
