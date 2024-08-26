import { CreatePassengerDTO } from '../../application/dtos/CreatePassengerDto';
import { Passenger } from '../../domain/entities/Passenger';
import { PassengerRepository } from '../../domain/repositories/PassengerRepository';
import { prisma } from '../../main/prisma/client';

export class PassengerRepositoryImpl implements PassengerRepository {
	private static instance: PassengerRepositoryImpl;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new PassengerRepositoryImpl();
		}

		return this.instance;
	}

	async create(dto: CreatePassengerDTO): Promise<Passenger> {
		const newPassenger = await prisma.passenger.create({
			data: dto,
			include: {
				rides: true
			}
		});

		return new Passenger(
			newPassenger.id,
			newPassenger.name,
			newPassenger.cpf,
			newPassenger.age,
			newPassenger.sex,
			newPassenger.address,
			newPassenger.phoneNumber,
			newPassenger.email,
			newPassenger.birthDate,
			newPassenger.createdAt,
			newPassenger.updatedAt,
			newPassenger.rides
		);
	}

	async findById(passengerId: string): Promise<Passenger | null> {
		const passenger = await prisma.passenger.findUnique({
			where: { id: passengerId },
			include: { rides: true }
		});

		if (!passenger) {
			return null;
		}

		return new Passenger(
			passenger.id,
			passenger.name,
			passenger.cpf,
			passenger.age,
			passenger.sex,
			passenger.address,
			passenger.phoneNumber,
			passenger.email,
			passenger.birthDate,
			passenger.createdAt,
			passenger.updatedAt,
			passenger.rides
		);
	}

	async findByCpf(passengerCpf: string): Promise<Passenger | null> {
		const passenger = await prisma.passenger.findUnique({
			where: { cpf: passengerCpf },
			include: { rides: true }
		});

		if (!passenger) {
			return null;
		}

		return new Passenger(
			passenger.id,
			passenger.name,
			passenger.cpf,
			passenger.age,
			passenger.sex,
			passenger.address,
			passenger.phoneNumber,
			passenger.email,
			passenger.birthDate,
			passenger.createdAt,
			passenger.updatedAt,
			passenger.rides
		);
	}

	async findByEmail(passengerEmail: string): Promise<Passenger | null> {
		const passenger = await prisma.passenger.findUnique({
			where: { email: passengerEmail },
			include: { rides: true }
		});

		if (!passenger) {
			return null;
		}

		return new Passenger(
			passenger.id,
			passenger.name,
			passenger.cpf,
			passenger.age,
			passenger.sex,
			passenger.address,
			passenger.phoneNumber,
			passenger.email,
			passenger.birthDate,
			passenger.createdAt,
			passenger.updatedAt,
			passenger.rides
		);
	}

	async findAll(): Promise<Passenger[]> {
		const passengers = await prisma.passenger.findMany({
			include: { rides: true }
		});

		return passengers.map(
			(passenger) =>
				new Passenger(
					passenger.id,
					passenger.name,
					passenger.cpf,
					passenger.age,
					passenger.sex,
					passenger.address,
					passenger.phoneNumber,
					passenger.email,
					passenger.birthDate,
					passenger.createdAt,
					passenger.updatedAt,
					passenger.rides
				)
		);
	}

	async update(dto: Passenger): Promise<Passenger> {
		const updatedPassenger = await prisma.passenger.update({
			where: { id: dto.id },
			data: {
				name: dto.name,
				cpf: dto.cpf,
				age: dto.age,
				sex: dto.sex,
				address: dto.address,
				phoneNumber: dto.phoneNumber,
				email: dto.email
			},
			include: {
				rides: true
			}
		});

		return new Passenger(
			updatedPassenger.id,
			updatedPassenger.name,
			updatedPassenger.cpf,
			updatedPassenger.age,
			updatedPassenger.sex,
			updatedPassenger.address,
			updatedPassenger.phoneNumber,
			updatedPassenger.email,
			updatedPassenger.birthDate,
			updatedPassenger.createdAt,
			updatedPassenger.updatedAt,
			updatedPassenger.rides
		);
	}

	async delete(passengerId: string): Promise<void> {
		await prisma.passenger.delete({
			where: { id: passengerId }
		});
	}
}
