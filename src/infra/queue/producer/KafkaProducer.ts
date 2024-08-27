import { Kafka, logLevel, Partitioners, Producer } from 'kafkajs';
import { MessageDTO } from '../../../application/dtos/MessageDTO';
import { ENV } from '../../config';

export class KafkaProducer {
	private static instance: KafkaProducer;
	private kafka: Kafka;
	private producer: Producer;

	private constructor() {
		this.kafka = new Kafka({
			clientId: 'driversApp',
			brokers: [ENV.KAFKA_BROKER],
			ssl: true,
			sasl: {
				mechanism: 'scram-sha-256',
				username: ENV.KAFKA_USERNAME as string,
				password: ENV.KAFKA_PASSWORD as string
			},
			logLevel: logLevel.ERROR
		});
		this.producer = this.kafka.producer({
			createPartitioner: Partitioners.DefaultPartitioner,
			allowAutoTopicCreation: false
		});
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new KafkaProducer();
		}

		return this.instance;
	}

	async sendMessage(topic: string, message: MessageDTO) {
		await this.producer.connect();
		await this.producer.connect();
		await this.producer.send({
			topic,
			messages: [{ value: JSON.stringify(message) }]
		});
		await this.producer.disconnect();
	}
}
