import request from 'supertest';
import {
	FareRequestDTO,
	LocationPoint
} from '../application/dtos/FareRequestDTO';
import app from '../main/app';

describe('Fare routes', () => {
	it('Should return the fare for a race', async () => {
		const fare = new FareRequestDTO({
			from: new LocationPoint({
				latitude: '40.712776',
				longitude: '-74.005974'
			}),
			to: new LocationPoint({
				latitude: '34.052235',
				longitude: '-118.243683'
			}),
			dateTime: new Date().toISOString()
		});
		const response = await request(app).post('/fare').send(fare);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Fare generated successfully');
	});

	it('Should return 422 for the invalid location', async () => {
		const fare = new FareRequestDTO({
			from: new LocationPoint({
				latitude: '120.712776',
				longitude: '-74.005974'
			}),
			to: new LocationPoint({
				latitude: '80.052235',
				longitude: '-118.243683'
			}),
			dateTime: new Date().toISOString()
		});
		const response = await request(app).post('/fare').send(fare);

		expect(response.status).toBe(422);
		expect(response.body.message).toBe('Invalid initial geolocalization');
	});

	it('Should return 422 for the invalid date', async () => {
		const fare = new FareRequestDTO({
			from: new LocationPoint({
				latitude: '70.712776',
				longitude: '-74.005974'
			}),
			to: new LocationPoint({
				latitude: '80.052235',
				longitude: '-118.243683'
			}),
			dateTime: Date.now().toString()
		});
		const response = await request(app).post('/fare').send(fare);

		expect(response.status).toBe(422);
		expect(response.body.message).toBe('Invalid date');
	});
});
