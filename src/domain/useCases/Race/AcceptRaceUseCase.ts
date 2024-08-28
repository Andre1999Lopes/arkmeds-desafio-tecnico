import { AcceptRaceRequestDTO } from '../../../application/dtos/AcceptRaceRequestDTO';
import { MessageDTO } from '../../../application/dtos/MessageDTO';
import { ValidationService } from '../../../application/services/ValidationService';
import { ENV } from '../../../infra/config';
import { KafkaProducer } from '../../../infra/queue/producer/KafkaProducer';

export class AcceptRaceUseCase {
	private static instance: AcceptRaceUseCase;
	private producer: KafkaProducer;
	private validationService: ValidationService;

	private constructor(
		producer: KafkaProducer,
		validationService: ValidationService
	) {
		this.producer = producer;
		this.validationService = validationService;
	}

	static getInstance(
		producer: KafkaProducer,
		validationService: ValidationService
	) {
		if (!this.instance) {
			this.instance = new AcceptRaceUseCase(producer, validationService);
		}

		return this.instance;
	}

	async execute(raceData: AcceptRaceRequestDTO) {
		this.validationService.validateRace(raceData);
		const message = new MessageDTO({
			...raceData,
			distance: Math.round(parseFloat(raceData.distance) * 100) / 100,
			fare: Math.round(parseFloat(raceData.fare) * 100) / 100,
			date: new Date().toISOString()
		});

		await this.producer.sendMessage(ENV.KAFKA_TOPIC, message);
	}
}
