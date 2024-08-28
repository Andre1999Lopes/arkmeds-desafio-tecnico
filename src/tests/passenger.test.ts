import request from 'supertest';
import { v4 } from 'uuid';
import { PassengerDTO } from '../application/dtos/PassengerDTO';
import app from '../main/app';
import { prisma } from '../main/prisma/client';

const passenger = new PassengerDTO({
	name: 'John Doe',
	cpf: '12345678909',
	age: '30',
	sex: 'M',
	address: '123 Main St',
	email: 'johndoe@example.com',
	phoneNumber: '1234567890',
	birthDate: '03/08/1999'
});

describe('Passenger Routes', () => {
	let createdPassengerId: string;

	afterAll(async () => {
		await prisma.passenger.deleteMany({});
		await prisma.$disconnect();
	});

	describe('POST /passenger', () => {
		it('should create a new passenger', async () => {
			const response = await request(app).post('/passenger').send(passenger);

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty(
				'message',
				'Passenger created successfully'
			);
			expect(response.body.data).toHaveProperty('id');
			createdPassengerId = response.body.data.id;
		});

		it('should not create a passenger with existing CPF', async () => {
			const response = await request(app).post('/passenger').send(passenger);

			expect(response.status).toBe(409);
			expect(response.body).toHaveProperty(
				'message',
				'A passenger with this CPF already exists'
			);
		});

		it('should not create a passenger with existing email', async () => {
			const response = await request(app)
				.post('/passenger')
				.send({
					...passenger,
					cpf: '13697126938'
				});

			expect(response.status).toBe(409);
			expect(response.body).toHaveProperty(
				'message',
				'A passenger with this email already exists'
			);
		});
	});

	describe('GET /passenger', () => {
		it('should retrieve all passengers', async () => {
			const response = await request(app).get('/passenger');

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'message',
				'Passengers retrieved successfully'
			);
			expect(response.body.data).toBeInstanceOf(Array);
		});
	});

	describe('GET /passenger/:id', () => {
		it('should retrieve a passenger by ID', async () => {
			const response = await request(app).get(
				`/passenger/${createdPassengerId}`
			);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'message',
				'Passenger retrieved successfully'
			);
			expect(response.body.data).toHaveProperty('id', createdPassengerId);
		});

		it('should return 404 for a non-existing passenger', async () => {
			const response = await request(app).get('/passenger/' + v4());

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty(
				'message',
				'There is no user with the given ID'
			);
		});

		it('should return 422 for a non-valid ID', async () => {
			const response = await request(app).get('/passenger/nonvalidid');

			expect(response.status).toBe(422);
			expect(response.body).toHaveProperty('message', 'Invalid UUID');
		});
	});

	describe('PUT /passenger/:id', () => {
		it('should update an existing passenger', async () => {
			const response = await request(app)
				.put(`/passenger/${createdPassengerId}`)
				.send({
					name: 'John Doe Updated',
					email: 'johnupdated@example.com'
				});

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'message',
				'Passenger updated successfully'
			);
			expect(response.body.data).toHaveProperty('name', 'John Doe Updated');
			expect(response.body.data).toHaveProperty(
				'email',
				'johnupdated@example.com'
			);
		});

		it('should return 404 when trying to update a non-existing passenger', async () => {
			const response = await request(app)
				.put('/passenger/' + v4())
				.send({
					name: 'Jane Doe'
				});

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty(
				'message',
				'There is no user with the given ID'
			);
		});

		it('should return 422 for a non-valid ID', async () => {
			const response = await request(app).get('/passenger/nonvalidid');

			expect(response.status).toBe(422);
			expect(response.body).toHaveProperty('message', 'Invalid UUID');
		});

		it('should return 409 for an existing user', async () => {
			const response = await request(app)
				.put('/passenger/' + createdPassengerId)
				.send(passenger);

			expect(response.status).toBe(409);
			expect(response.body).toHaveProperty(
				'message',
				'A passenger with this CPF already exists'
			);
		});
	});

	describe('DELETE /passenger/:id', () => {
		it('should delete an existing passenger', async () => {
			const response = await request(app).delete(
				`/passenger/${createdPassengerId}`
			);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'message',
				'Passenger deleted successfully'
			);
		});

		it('should return 404 when trying to delete a non-existing passenger', async () => {
			const response = await request(app).delete('/passenger/' + v4());

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty(
				'message',
				'There is no user with the given ID'
			);
		});

		it('should return 422 for a non-valid ID', async () => {
			const response = await request(app).get('/passenger/nonvalidid');

			expect(response.status).toBe(422);
			expect(response.body).toHaveProperty('message', 'Invalid UUID');
		});
	});
});
