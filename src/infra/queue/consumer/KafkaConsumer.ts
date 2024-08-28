import fs from 'fs';
import { Consumer, Kafka, logLevel } from 'kafkajs';
import path from 'path';
import { MessageDTO } from '../../../application/dtos/MessageDTO';
import { ENV } from '../../config';

export class KafkaConsumer {
	private static instance: KafkaConsumer;
	private kafka: Kafka;
	private consumer: Consumer;

	private constructor() {
		this.kafka = new Kafka({
			clientId: 'driversAppConsumer',
			brokers: [ENV.KAFKA_BROKER],
			ssl: true,
			sasl: {
				mechanism: 'scram-sha-256',
				username: ENV.KAFKA_USERNAME as string,
				password: ENV.KAFKA_PASSWORD as string
			},
			logLevel: logLevel.ERROR
		});
		this.consumer = this.kafka.consumer({ groupId: 'driverGroup' });
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new KafkaConsumer();
		}

		return this.instance;
	}

	async connect(): Promise<void> {
		await this.consumer.connect();
		await this.consumer.subscribe({
			topic: ENV.KAFKA_TOPIC,
			fromBeginning: true
		});

		await this.consumer.run({
			eachMessage: async ({ message }) => {
				const raceData = JSON.parse(message.value!.toString()) as MessageDTO;
				const receiptPath = path.join(
					__dirname,
					'../../../tmp',
					raceData.userId
				);

				fs.mkdirSync(receiptPath, { recursive: true });

				const receiptContent = JSON.stringify(raceData, null, 2) + '\n';

				fs.appendFileSync(
					path.join(receiptPath, `${raceData.date.split('T')[0]}.txt`),
					receiptContent
				);
			}
		});
	}
}
