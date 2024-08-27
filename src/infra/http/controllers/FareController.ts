import { Request, Response } from 'express';
import { FareRequestDTO } from '../../../application/dtos/FareRequestDTO';
import { ValidationError } from '../../../domain/errors/ValidationError';
import { CalculateFareUseCase } from '../../../domain/useCases/Fare/CalculateFareUseCase';

export class FareController {
	private static instance: FareController;

	private constructor(private calculateFareUseCase: CalculateFareUseCase) {
		this.getFare = this.getFare.bind(this);
	}

	static getInstance(calculateFareUseCase: CalculateFareUseCase) {
		if (!this.instance) {
			this.instance = new FareController(calculateFareUseCase);
		}

		return this.instance;
	}

	async getFare(req: Request, res: Response) {
		try {
			const fareRequest = new FareRequestDTO({ ...req.body });
			const fareResponse = await this.calculateFareUseCase.execute(fareRequest);

			return res
				.status(200)
				.json({ message: 'Fare generated successfully', data: fareResponse });
		} catch (error: any) {
			if (error instanceof ValidationError) {
				return res.status(422).json({ message: error.message });
			}

			return res.status(500).json({ message: 'Error generating fare' });
		}
	}
}
