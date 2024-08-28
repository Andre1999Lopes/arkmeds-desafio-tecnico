import { AcceptRaceRequestDTO } from '../../../application/dtos/AcceptRaceRequestDTO';
import { MessageDTO } from '../../../application/dtos/MessageDTO';
import { ENV } from '../../../infra/config';
import { KafkaProducer } from '../../../infra/queue/producer/KafkaProducer';

export class AcceptRaceUseCase {
	private static instance: AcceptRaceUseCase;
	private producer: KafkaProducer;

	private constructor(producer: KafkaProducer) {
		this.producer = producer;
	}

	static getInstance(producer: KafkaProducer) {
		if (!this.instance) {
			this.instance = new AcceptRaceUseCase(producer);
		}

		return this.instance;
	}

	async execute(raceData: AcceptRaceRequestDTO) {
		const message = new MessageDTO({
			...raceData,
			fare: parseFloat(raceData.fare),
			date: new Date().toISOString()
		});

		await this.producer.sendMessage(ENV.KAFKA_TOPIC, message);
	}
}
