import { Request, Response } from 'express';
import { CreateDriverDTO } from '../../../application/dtos/CreateDriverDto';
import { Driver } from '../../../domain/entities/Driver';
import { CreateDriver } from '../../../domain/useCases/Driver/CreateDriver';
import { DeleteDriver } from '../../../domain/useCases/Driver/DeleteDriver';
import { FindAllDrivers } from '../../../domain/useCases/Driver/FindAllDrivers';
import { FindDriverById } from '../../../domain/useCases/Driver/FindDriverById';
import { UpdateDriver } from '../../../domain/useCases/Driver/UpdateDriver';

export class DriverController {
	private static instance: DriverController;

	private constructor(
		private createDriver: CreateDriver,
		private findAllDrivers: FindAllDrivers,
		private findDriverById: FindDriverById,
		private updateDriver: UpdateDriver,
		private deleteDriver: DeleteDriver
	) {
		this.create = this.create.bind(this);
		this.findAll = this.findAll.bind(this);
		this.findById = this.findById.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

	static getInstance(
		createDriver: CreateDriver,
		findAllDrivers: FindAllDrivers,
		findDriverById: FindDriverById,
		updateDriver: UpdateDriver,
		deleteDriver: DeleteDriver
	) {
		if (!this.instance) {
			this.instance = new DriverController(
				createDriver,
				findAllDrivers,
				findDriverById,
				updateDriver,
				deleteDriver
			);
		}

		return this.instance;
	}

	async create(req: Request, res: Response) {
		try {
			const body = req.body as CreateDriverDTO;
			const driver = await this.createDriver.execute(body);
			return res
				.status(200)
				.json({ message: 'Driver created successfully', data: driver });
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	async findAll(req: Request, res: Response) {
		try {
			const drivers = await this.findAllDrivers.execute();
			return res.status(200).json({
				message: 'Drivers retrieved successfully',
				data: drivers
			});
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	async findById(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const driver = await this.findDriverById.execute(id);
			return res.status(200).json({
				message: 'Driver retrieved successfully',
				data: driver
			});
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const body = req.body as Driver;
			const driver = await this.updateDriver.execute(body);
			return res.status(200).json({
				message: 'Driver updated successfully',
				data: driver
			});
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const driver = await this.deleteDriver.execute(id);
			return res
				.status(200)
				.json({ message: 'Driver deleted successfully', data: driver });
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}
}
