import request from 'supertest';
import { v4 } from 'uuid';
import { DriverDTO } from '../application/dtos/DriverDTO';
import app from '../main/app';
import { prisma } from '../main/prisma/client';

const driver = new DriverDTO({
	name: 'John Doe',
	cpf: '12345678909',
	age: '30',
	sex: 'M',
	address: '123 Main St',
	email: 'johndoe@example.com',
	phoneNumber: '1234567890',
	birthDate: '1993-01-01',
	licenseNumber: 'AB123456',
	vehiclePlate: 'ABC1234'
});

describe('Driver Routes', () => {
	let createdDriverId: string;

	afterAll(async () => {
		await prisma.driver.deleteMany({});
		await prisma.$disconnect();
	});

	describe('POST /driver', () => {
		it('should create a new driver', async () => {
			const response = await request(app).post('/driver').send(driver);

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty(
				'message',
				'Driver created successfully'
			);
			expect(response.body.data).toHaveProperty('id');
			createdDriverId = response.body.data.id;
		});

		it('should not create a driver with existing CPF', async () => {
			const response = await request(app).post('/driver').send(driver);

			expect(response.status).toBe(409);
			expect(response.body).toHaveProperty(
				'message',
				'A driver with this CPF already exists'
			);
		});

		it('should not create a driver with existing email', async () => {
			const response = await request(app)
				.post('/driver')
				.send({
					...driver,
					cpf: '13697126938'
				});

			expect(response.status).toBe(409);
			expect(response.body).toHaveProperty(
				'message',
				'A driver with this email already exists'
			);
		});
	});

	describe('GET /driver', () => {
		it('should retrieve all drivers', async () => {
			const response = await request(app).get('/driver');

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'message',
				'Drivers retrieved successfully'
			);
			expect(response.body.data).toBeInstanceOf(Array);
		});
	});

	describe('GET /driver/:id', () => {
		it('should retrieve a driver by ID', async () => {
			const response = await request(app).get(`/driver/${createdDriverId}`);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'message',
				'Driver retrieved successfully'
			);
			expect(response.body.data).toHaveProperty('id', createdDriverId);
		});

		it('should return 404 for a non-existing driver', async () => {
			const response = await request(app).get('/driver/' + v4());

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty(
				'message',
				'There is no user with the given ID'
			);
		});

		it('should return 422 for a non-valid ID', async () => {
			const response = await request(app).get('/driver/nonvalidid');

			expect(response.status).toBe(422);
			expect(response.body).toHaveProperty('message', 'Invalid UUID');
		});
	});

	describe('PUT /driver/:id', () => {
		it('should update an existing driver', async () => {
			const response = await request(app)
				.put(`/driver/${createdDriverId}`)
				.send({
					name: 'John Doe Updated',
					email: 'johnupdated@example.com'
				});

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'message',
				'Driver updated successfully'
			);
			expect(response.body.data).toHaveProperty('name', 'John Doe Updated');
			expect(response.body.data).toHaveProperty(
				'email',
				'johnupdated@example.com'
			);
		});

		it('should return 404 when trying to update a non-existing driver', async () => {
			const response = await request(app)
				.put('/driver/' + v4())
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
			const response = await request(app).get('/driver/nonvalidid');

			expect(response.status).toBe(422);
			expect(response.body).toHaveProperty('message', 'Invalid UUID');
		});

		it('should return 409 for an existing user', async () => {
			const response = await request(app)
				.put('/driver/' + createdDriverId)
				.send(driver);

			expect(response.status).toBe(409);
			expect(response.body).toHaveProperty(
				'message',
				'A driver with this CPF already exists'
			);
		});
	});

	describe('DELETE /driver/:id', () => {
		it('should delete an existing driver', async () => {
			const response = await request(app).delete(`/driver/${createdDriverId}`);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty(
				'message',
				'Driver deleted successfully'
			);
		});

		it('should return 404 when trying to delete a non-existing driver', async () => {
			const response = await request(app).delete('/driver/' + v4());

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty(
				'message',
				'There is no user with the given ID'
			);
		});

		it('should return 422 for a non-valid ID', async () => {
			const response = await request(app).get('/driver/nonvalidid');

			expect(response.status).toBe(422);
			expect(response.body).toHaveProperty('message', 'Invalid UUID');
		});
	});
});
