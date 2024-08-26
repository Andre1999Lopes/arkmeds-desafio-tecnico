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
		const user = await this.passengerRepository.findById(passengerId);

		return user;
	}
}
