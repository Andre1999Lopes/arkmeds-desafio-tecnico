import { Request, Response } from 'express';
import { PassengerDTO } from '../../../application/dtos/PassengerDTO';
import { UserAlreadyExistsError } from '../../../domain/errors/UserAlreadyExistsError';
import { UserNotFoundError } from '../../../domain/errors/UserNotFoundError';
import { ValidationError } from '../../../domain/errors/ValidationError';
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
	) {
		this.create = this.create.bind(this);
		this.findAll = this.findAll.bind(this);
		this.findById = this.findById.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

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
			const newPassenger = new PassengerDTO({ ...req.body });
			const passenger = await this.createPassenger.execute(newPassenger);
			return res
				.status(201)
				.json({ message: 'Passenger created successfully', data: passenger });
		} catch (error: any) {
			if (error instanceof ValidationError) {
				return res.status(422).json({ message: error.message });
			}

			if (error instanceof UserAlreadyExistsError) {
				return res.status(409).json({ message: error.message });
			}

			return res.status(500).json({ message: error.message });
		}
	}

	async findAll(_req: Request, res: Response) {
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
			if (error instanceof UserNotFoundError) {
				return res.status(404).json({ message: error.message });
			}

			return res.status(500).json({ message: error.message });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const passengerToUpdate = new PassengerDTO({ ...req.body });
			const passenger = await this.updatePassenger.execute(
				id,
				passengerToUpdate
			);
			return res.status(200).json({
				message: 'Passenger updated successfully',
				data: passenger
			});
		} catch (error: any) {
			if (error instanceof ValidationError) {
				return res.status(422).json({ message: error.message });
			}

			if (error instanceof UserNotFoundError) {
				return res.status(404).json({ message: error.message });
			}

			if (error instanceof UserAlreadyExistsError) {
				return res.status(409).json({ message: error.message });
			}

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
			if (error instanceof UserNotFoundError) {
				return res.status(404).json({ message: error.message });
			}

			return res.status(500).json({ message: error.message });
		}
	}
}
