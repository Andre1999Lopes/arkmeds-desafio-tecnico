import { Request, Response } from 'express';
import { CreatePassengerDTO } from '../../../application/dtos/CreatePassengerDto';
import { Passenger } from '../../../domain/entities/Passenger';
import { CreatePassenger } from '../../../domain/useCases/Passenger/CreatePassenger';
import { DeletePassenger } from '../../../domain/useCases/Passenger/DeletePassenger';
import { FindAllPassengers } from '../../../domain/useCases/Passenger/FindAllPassengers';
import { FindPassengerById } from '../../../domain/useCases/Passenger/FindPassengerById';
import { UpdatePassenger } from '../../../domain/useCases/Passenger/UpdatePassenger';

export class PassengerController {
	private static instance: PassengerController;

	private constructor(
		private createPassenger: CreatePassenger,
		private findAllPassengers: FindAllPassengers,
		private findPassengerById: FindPassengerById,
		private updatePassenger: UpdatePassenger,
		private deletePassenger: DeletePassenger
	) {}

	static getInstance(
		createPassenger: CreatePassenger,
		findAllPassengers: FindAllPassengers,
		findPassengerById: FindPassengerById,
		updatePassenger: UpdatePassenger,
		deletePassenger: DeletePassenger
	) {
		if (!this.instance) {
			this.instance = new PassengerController(
				createPassenger,
				findAllPassengers,
				findPassengerById,
				updatePassenger,
				deletePassenger
			);
		}

		return this.instance;
	}

	async create(req: Request, res: Response) {
		try {
			const body = req.body as CreatePassengerDTO;
			const passenger = await this.createPassenger.execute(body);
			return res
				.status(200)
				.json({ message: 'Passenger created successfully', data: passenger });
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	async findAll(req: Request, res: Response) {
		try {
			const passengers = await this.findAllPassengers.execute();
			return res.status(200).json({
				message: 'Passengers retrieved successfully',
				data: passengers
			});
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	async findById(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const passenger = await this.findPassengerById.execute(id);
			return res.status(200).json({
				message: 'Passenger retrieved successfully',
				data: passenger
			});
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const body = req.body as Passenger;
			const passenger = await this.updatePassenger.execute(body);
			return res.status(200).json({
				message: 'Passenger updated successfully',
				data: passenger
			});
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const passenger = await this.deletePassenger.execute(id);
			return res
				.status(200)
				.json({ message: 'Passenger deleted successfully', data: passenger });
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}
}
