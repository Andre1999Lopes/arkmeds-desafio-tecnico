import { PassengerDTO } from '../../application/dtos/PassengerDTO';
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

	async create(passenger: PassengerDTO): Promise<Passenger> {
		const newPassenger = await prisma.passenger.create({
			data: {
				...passenger,
				age: parseInt(passenger.age),
				birthDate: new Date(passenger.birthDate)
			}
		});

		return new Passenger({ ...newPassenger });
	}

	async findById(passengerId: string): Promise<Passenger | null> {
		const passenger = await prisma.passenger.findUnique({
			where: { id: passengerId }
		});

		if (!passenger) {
			return null;
		}

		return new Passenger({ ...passenger });
	}

	async findByCpf(passengerCpf: string): Promise<Passenger | null> {
		const passenger = await prisma.passenger.findUnique({
			where: { cpf: passengerCpf }
		});

		if (!passenger) {
			return null;
		}

		return new Passenger({ ...passenger });
	}

	async findByEmail(passengerEmail: string): Promise<Passenger | null> {
		const passenger = await prisma.passenger.findUnique({
			where: { email: passengerEmail }
		});

		if (!passenger) {
			return null;
		}

		return new Passenger({ ...passenger });
	}

	async findAll(): Promise<Passenger[]> {
		const passengers = await prisma.passenger.findMany({});

		return passengers.map((passenger) => new Passenger({ ...passenger }));
	}

	async update(id: string, passenger: PassengerDTO): Promise<Passenger> {
		const updatedPassenger = await prisma.passenger.update({
			where: { id: id },
			data: {
				...passenger,
				age: passenger.age ? parseInt(passenger.age) : undefined,
				birthDate: passenger.birthDate
					? new Date(passenger.birthDate)
					: undefined
			}
		});

		return new Passenger({ ...updatedPassenger });
	}

	async delete(passengerId: string): Promise<void> {
		await prisma.passenger.delete({
			where: { id: passengerId }
		});
	}
}
