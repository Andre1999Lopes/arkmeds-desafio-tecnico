import { CreateDriverDTO } from '../../application/dtos/CreateDriverDto';
import { Driver } from '../../domain/entities/Driver';
import { DriverRepository } from '../../domain/repositories/DriverRepository';
import { prisma } from '../../main/prisma/client';

export class DriverRepositoryImpl implements DriverRepository {
	private static instance: DriverRepositoryImpl;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new DriverRepositoryImpl();
		}

		return this.instance;
	}

	async create(dto: CreateDriverDTO): Promise<Driver> {
		const newDriver = await prisma.driver.create({
			data: dto,
			include: {
				rides: true
			}
		});

		return new Driver(
			newDriver.id,
			newDriver.name,
			newDriver.cpf,
			newDriver.age,
			newDriver.sex,
			newDriver.address,
			newDriver.phoneNumber,
			newDriver.email,
			newDriver.licenseNumber,
			newDriver.vehiclePlate,
			newDriver.birthDate,
			newDriver.createdAt,
			newDriver.updatedAt,
			newDriver.rides
		);
	}

	async findById(driverId: string): Promise<Driver | null> {
		const driver = await prisma.driver.findUnique({
			where: { id: driverId },
			include: { rides: true }
		});

		if (!driver) {
			return null;
		}

		return new Driver(
			driver.id,
			driver.name,
			driver.cpf,
			driver.age,
			driver.sex,
			driver.address,
			driver.phoneNumber,
			driver.email,
			driver.licenseNumber,
			driver.vehiclePlate,
			driver.birthDate,
			driver.createdAt,
			driver.updatedAt,
			driver.rides
		);
	}

	async findByCpf(driverCpf: string): Promise<Driver | null> {
		const driver = await prisma.driver.findUnique({
			where: { cpf: driverCpf },
			include: { rides: true }
		});

		if (!driver) {
			return null;
		}

		return new Driver(
			driver.id,
			driver.name,
			driver.cpf,
			driver.age,
			driver.sex,
			driver.address,
			driver.phoneNumber,
			driver.email,
			driver.licenseNumber,
			driver.vehiclePlate,
			driver.birthDate,
			driver.createdAt,
			driver.updatedAt,
			driver.rides
		);
	}

	async findByLicenseNumber(licenseNumber: string): Promise<Driver | null> {
		const driver = await prisma.driver.findUnique({
			where: { licenseNumber },
			include: { rides: true }
		});

		if (!driver) {
			return null;
		}

		return new Driver(
			driver.id,
			driver.name,
			driver.cpf,
			driver.age,
			driver.sex,
			driver.address,
			driver.phoneNumber,
			driver.email,
			driver.licenseNumber,
			driver.vehiclePlate,
			driver.birthDate,
			driver.createdAt,
			driver.updatedAt,
			driver.rides
		);
	}

	async findByEmail(driverEmail: string): Promise<Driver | null> {
		const driver = await prisma.driver.findUnique({
			where: { email: driverEmail },
			include: { rides: true }
		});

		if (!driver) {
			return null;
		}

		return new Driver(
			driver.id,
			driver.name,
			driver.cpf,
			driver.age,
			driver.sex,
			driver.address,
			driver.phoneNumber,
			driver.email,
			driver.licenseNumber,
			driver.vehiclePlate,
			driver.birthDate,
			driver.createdAt,
			driver.updatedAt,
			driver.rides
		);
	}

	async findAll(): Promise<Driver[]> {
		const drivers = await prisma.driver.findMany({
			include: { rides: true }
		});

		return drivers.map(
			(driver) =>
				new Driver(
					driver.id,
					driver.name,
					driver.cpf,
					driver.age,
					driver.sex,
					driver.address,
					driver.phoneNumber,
					driver.email,
					driver.licenseNumber,
					driver.vehiclePlate,
					driver.birthDate,
					driver.createdAt,
					driver.updatedAt,
					driver.rides
				)
		);
	}

	async update(dto: Driver): Promise<Driver> {
		const updatedDriver = await prisma.driver.update({
			where: { id: dto.id },
			data: {
				name: dto.name,
				cpf: dto.cpf,
				age: dto.age,
				sex: dto.sex,
				address: dto.address,
				phoneNumber: dto.phoneNumber,
				email: dto.email,
				licenseNumber: dto.licenseNumber,
				vehiclePlate: dto.vehiclePlate
			},
			include: {
				rides: true
			}
		});

		return new Driver(
			updatedDriver.id,
			updatedDriver.name,
			updatedDriver.cpf,
			updatedDriver.age,
			updatedDriver.sex,
			updatedDriver.address,
			updatedDriver.phoneNumber,
			updatedDriver.email,
			updatedDriver.licenseNumber,
			updatedDriver.vehiclePlate,
			updatedDriver.birthDate,
			updatedDriver.createdAt,
			updatedDriver.updatedAt,
			updatedDriver.rides
		);
	}

	async delete(driverId: string): Promise<void> {
		await prisma.driver.delete({
			where: { id: driverId }
		});
	}
}
