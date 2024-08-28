import express from 'express';
import fs from 'fs';
import path from 'path';
import request from 'supertest';
import { AcceptRaceRequestDTO } from '../application/dtos/AcceptRaceRequestDTO';
import { MessageDTO } from '../application/dtos/MessageDTO';
import { AcceptRaceUseCase } from '../domain/useCases/Race/AcceptRaceUseCase';
import { ENV } from '../infra/config';
import { raceRouter } from '../infra/http/routes/race.routes';
import { KafkaConsumer } from '../infra/queue/consumer/KafkaConsumer';
import { KafkaProducer } from '../infra/queue/producer/KafkaProducer';

jest.mock('kafkajs', () => {
	const actualKafkaJS = jest.requireActual('kafkajs');
	return {
		Kafka: jest.fn().mockImplementation(() => ({
			producer: jest.fn().mockReturnValue({
				connect: jest.fn(),
				send: jest.fn().mockResolvedValue([]),
				disconnect: jest.fn()
			}),
			consumer: jest.fn().mockReturnValue({
				connect: jest.fn(),
				subscribe: jest.fn(),
				run: jest.fn().mockImplementation(({ eachMessage }) => {
					eachMessage({
						message: {
							value: JSON.stringify({
								userId: '123',
								fare: 50,
								date: '2024-08-27T12:00:00Z'
							})
						}
					});
					return Promise.resolve();
				})
			})
		})),
		logLevel: actualKafkaJS.logLevel,
		Partitioners: actualKafkaJS.Partitioners
	};
});

jest.mock('fs');

describe('Kafka Producer', () => {
	let kafkaProducer: KafkaProducer;
	let producerSendMock: jest.SpyInstance;

	beforeEach(() => {
		kafkaProducer = KafkaProducer.getInstance();
		producerSendMock = jest.spyOn(kafkaProducer['producer'], 'send');
	});

	it('should send a message', async () => {
		const message = new MessageDTO({
			userId: '123',
			fare: 50,
			date: new Date().toISOString(),
			distance: 50
		});

		await kafkaProducer.sendMessage(ENV.KAFKA_TOPIC, message);

		expect(producerSendMock).toHaveBeenCalledWith({
			topic: ENV.KAFKA_TOPIC,
			messages: [{ value: JSON.stringify(message) }]
		});
	});
});

describe('AcceptRaceUseCase', () => {
	let acceptRaceUseCase: AcceptRaceUseCase;
	let producerSendMessageMock: jest.SpyInstance;

	beforeEach(() => {
		const producer = KafkaProducer.getInstance() as jest.Mocked<KafkaProducer>;
		producerSendMessageMock = jest.spyOn(producer, 'sendMessage');
		acceptRaceUseCase = AcceptRaceUseCase.getInstance(producer);
	});

	it('should send a message with correct data', async () => {
		const raceData = new AcceptRaceRequestDTO({
			userId: '123',
			fare: '50',
			distance: 50
		});

		const message = new MessageDTO({
			userId: raceData.userId,
			fare: parseInt(raceData.fare),
			distance: raceData.distance,
			date: new Date().toISOString()
		});

		await acceptRaceUseCase.execute(raceData);

		expect(producerSendMessageMock).toHaveBeenCalledWith(
			ENV.KAFKA_TOPIC,
			message
		);
	});
});

describe('KafkaConsumer', () => {
	let kafkaConsumer: KafkaConsumer;
	let mkdirSyncMock: jest.SpyInstance;
	let appendFileSyncMock: jest.SpyInstance;

	beforeEach(() => {
		kafkaConsumer = KafkaConsumer.getInstance();
		mkdirSyncMock = jest.spyOn(fs, 'mkdirSync');
		appendFileSyncMock = jest.spyOn(fs, 'appendFileSync');
	});

	it('should create directory and file on message consumption', async () => {
		await kafkaConsumer.connect();

		expect(mkdirSyncMock).toHaveBeenCalledWith(
			path.join(__dirname, '../tmp', '123'),
			{ recursive: true }
		);

		expect(appendFileSyncMock).toHaveBeenCalledWith(
			path.join(__dirname, '../tmp', '123', `2024-08-27.txt`),
			JSON.stringify(
				{
					userId: '123',
					fare: 50,
					date: '2024-08-27T12:00:00Z'
				},
				null,
				2
			) + '\n'
		);
	});
});

describe('RaceController', () => {
	let app: express.Express;
	let acceptRaceUseCase: jest.Mocked<AcceptRaceUseCase>;

	beforeEach(() => {
		app = express();
		app.use(express.json());
		app.use('/race', raceRouter);

		acceptRaceUseCase = AcceptRaceUseCase.getInstance(
			KafkaProducer.getInstance()
		) as jest.Mocked<AcceptRaceUseCase>;
	});

	it('should handle race acceptance', async () => {
		const raceData = new AcceptRaceRequestDTO({
			userId: '123',
			fare: '50',
			distance: 50
		});
		const message = new MessageDTO({
			...raceData,
			fare: parseFloat(raceData.fare),
			date: new Date().toISOString()
		});

		jest.spyOn(acceptRaceUseCase, 'execute').mockResolvedValueOnce(undefined);

		const response = await request(app).post('/race').send(raceData);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Race accepted');
		expect(acceptRaceUseCase.execute).toHaveBeenCalledWith(raceData);
	});
});
