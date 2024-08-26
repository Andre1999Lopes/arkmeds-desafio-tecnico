import { PassengerRepository } from '../../repositories/PassengerRepository';

export class DeletePassenger {
	private static instance: DeletePassenger;

	private constructor(private passengerRepository: PassengerRepository) {}

	static getInstance(passengerRepository: PassengerRepository) {
		if (!this.instance) {
			this.instance = new DeletePassenger(passengerRepository);
		}

		return this.instance;
	}

	async execute(passengerId: string) {
		return await this.passengerRepository.delete(passengerId);
	}
}
