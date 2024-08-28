import { PassengerDTO } from '../../../application/dtos/PassengerDTO';
import { ValidationService } from '../../../application/services/ValidationService';
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistsError';
import { UserNotFoundError } from '../../errors/UserNotFoundError';
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

	async execute(passengerId: string, passenger: PassengerDTO) {
		this.validationService.validateUuid(passengerId);
		const passengerExists = !!(await this.passengerRepository.findById(
			passengerId
		));

		if (!passengerExists) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		this.validationService.validateUser(passenger, false);

		if (passenger.cpf) {
			const passengerWithCpf = await this.passengerRepository.findByCpf(
				passenger.cpf
			);

			if (!!passengerWithCpf) {
				throw new UserAlreadyExistsError(
					'A passenger with this CPF already exists'
				);
			}
		}

		if (passenger.email) {
			const passengerWithEmail = await this.passengerRepository.findByEmail(
				passenger.email
			);

			if (!!passengerWithEmail) {
				throw new UserAlreadyExistsError(
					'A passenger with this email already exists'
				);
			}
		}

		const updatedPassenger = this.passengerRepository.update(
			passengerId,
			passenger
		);

		return updatedPassenger;
	}
}
