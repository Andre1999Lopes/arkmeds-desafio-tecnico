import { Request, Response } from 'express';
import { AcceptRaceRequestDTO } from '../../../application/dtos/AcceptRaceRequestDTO';
import { UserNotFoundError } from '../../../domain/errors/UserNotFoundError';
import { AcceptRaceUseCase } from '../../../domain/useCases/Race/AcceptRaceUseCase';

export class RaceController {
	private static instance: RaceController;

	private constructor(private acceptRaceUseCase: AcceptRaceUseCase) {
		this.acceptRace = this.acceptRace.bind(this);
	}

	static getInstance(acceptRaceUseCase: AcceptRaceUseCase) {
		if (!this.instance) {
			this.instance = new RaceController(acceptRaceUseCase);
		}

		return this.instance;
	}

	async acceptRace(req: Request, res: Response) {
		try {
			const raceData = new AcceptRaceRequestDTO({ ...req.body });
			await this.acceptRaceUseCase.execute(raceData);
			return res.status(200).json({ message: 'Race accepted' });
		} catch (error: any) {
			if (error instanceof UserNotFoundError) {
				return res.status(404).json({ message: error.message });
			}

			return res.status(500).json({ message: 'Internal server error' });
		}
	}
}
