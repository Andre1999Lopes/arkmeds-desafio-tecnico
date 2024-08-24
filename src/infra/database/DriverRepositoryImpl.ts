// src/infra/db/DriverRepositoryImpl.ts

import { PrismaClient } from '@prisma/client';
import { CreateDriverDTO } from '../../application/dtos/CreateDriverDto';
import { Driver } from '../../domain/entities/Driver';
import { DriverRepository } from '../../domain/repositories/DriverRepository';

export class DriverRepositoryImpl implements DriverRepository {
	private prisma = new PrismaClient();

	async create(dto: CreateDriverDTO): Promise<Driver> {
		const newDriver = await this.prisma.driver.create({
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
			newDriver.createdAt,
			newDriver.updatedAt,
			newDriver.rides
		);
	}

	async findById(driverId: string): Promise<Driver> {
		const driver = await this.prisma.driver.findUnique({
			where: { id: driverId },
			include: { rides: true }
		});

		if (!driver) {
			throw new Error('Driver not found');
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
			driver.createdAt,
			driver.updatedAt,
			driver.rides
		);
	}

	async findByCpf(driverCpf: string): Promise<Driver> {
		const driver = await this.prisma.driver.findUnique({
			where: { cpf: driverCpf },
			include: { rides: true }
		});

		if (!driver) {
			throw new Error('Driver not found');
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
			driver.createdAt,
			driver.updatedAt,
			driver.rides
		);
	}

	async findAll(): Promise<Driver[]> {
		const drivers = await this.prisma.driver.findMany({
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
					driver.createdAt,
					driver.updatedAt,
					driver.rides
				)
		);
	}

	async update(dto: Driver): Promise<Driver> {
		const updatedDriver = await this.prisma.driver.update({
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
			updatedDriver.createdAt,
			updatedDriver.updatedAt,
			updatedDriver.rides
		);
	}

	async delete(driverId: string): Promise<void> {
		await this.prisma.driver.delete({
			where: { id: driverId }
		});
	}
}
