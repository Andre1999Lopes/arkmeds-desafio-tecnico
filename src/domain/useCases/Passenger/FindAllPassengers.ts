import { PassengerRepository } from '../../repositories/PassengerRepository';

export class FindAllPassengers {
	private static instance: FindAllPassengers;

	private constructor(private passengerRepository: PassengerRepository) {}

	static getInstance(passengerRepository: PassengerRepository) {
		if (!this.instance) {
			this.instance = new FindAllPassengers(passengerRepository);
		}

		return this.instance;
	}

	async execute() {
		const passengersList = this.passengerRepository.findAll();

		return passengersList;
	}
}
