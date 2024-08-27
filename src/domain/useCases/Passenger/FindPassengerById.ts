import { UserNotFoundError } from '../../errors/UserNotFoundError';
import { PassengerRepository } from '../../repositories/PassengerRepository';

export class FindPassengerById {
	private static instance: FindPassengerById;

	private constructor(private passengerRepository: PassengerRepository) {}

	static getInstance(passengerRepository: PassengerRepository) {
		if (!this.instance) {
			this.instance = new FindPassengerById(passengerRepository);
		}

		return this.instance;
	}

	async execute(passengerId: string) {
		const passenger = await this.passengerRepository.findById(passengerId);

		if (!passenger) {
			throw new UserNotFoundError('There is no user with the given ID');
		}

		return passenger;
	}
}
