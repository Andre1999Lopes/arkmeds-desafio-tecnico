import { DriverDTO } from '../../application/dtos/DriverDTO';
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

	async create(driver: DriverDTO): Promise<Driver> {
		const newDriver = await prisma.driver.create({
			data: {
				...driver,
				age: parseInt(driver.age),
				birthDate: new Date(driver.birthDate)
			},
			include: {
				rides: true
			}
		});

		return new Driver({ ...newDriver });
	}

	async findById(driverId: string): Promise<Driver | null> {
		const driver = await prisma.driver.findUnique({
			where: { id: driverId },
			include: { rides: true }
		});

		if (!driver) {
			return null;
		}

		return new Driver({ ...driver });
	}

	async findByCpf(driverCpf: string): Promise<Driver | null> {
		const driver = await prisma.driver.findUnique({
			where: { cpf: driverCpf },
			include: { rides: true }
		});

		if (!driver) {
			return null;
		}

		return new Driver({ ...driver });
	}

	async findByLicenseNumber(licenseNumber: string): Promise<Driver | null> {
		const driver = await prisma.driver.findUnique({
			where: { licenseNumber },
			include: { rides: true }
		});

		if (!driver) {
			return null;
		}

		return new Driver({ ...driver });
	}

	async findByEmail(driverEmail: string): Promise<Driver | null> {
		const driver = await prisma.driver.findUnique({
			where: { email: driverEmail },
			include: { rides: true }
		});

		if (!driver) {
			return null;
		}

		return new Driver({ ...driver });
	}

	async findAll(): Promise<Driver[]> {
		const drivers = await prisma.driver.findMany({
			include: { rides: true }
		});

		return drivers.map((driver) => new Driver({ ...driver }));
	}

	async update(id: string, driverToUpdate: DriverDTO): Promise<Driver> {
		const updatedDriver = await prisma.driver.update({
			where: { id },
			data: {
				...driverToUpdate,
				age: driverToUpdate.age ? parseInt(driverToUpdate.age) : undefined,
				birthDate: driverToUpdate.birthDate
					? new Date(driverToUpdate.birthDate)
					: undefined
			},
			include: {
				rides: true
			}
		});

		return new Driver({ ...updatedDriver });
	}

	async delete(driverId: string): Promise<void> {
		await prisma.driver.delete({
			where: { id: driverId }
		});
	}
}
