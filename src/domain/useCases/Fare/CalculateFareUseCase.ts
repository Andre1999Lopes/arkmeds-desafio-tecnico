import {
	FareRequestDTO,
	LocationPoint
} from '../../../application/dtos/FareRequestDTO';
import { FareResponseDTO } from '../../../application/dtos/FareResponseDTO';
import { ValidationService } from '../../../application/services/ValidationService';

export class CalculateFareUseCase {
	private static instance: CalculateFareUseCase;
	private readonly WEEKDAY_DAY_RATE = 2.8;
	private readonly WEEKDAY_EVENING_RATE = 3.5;
	private readonly WEEKDAY_NIGHT_RATE = 3.1;
	private readonly WEEKEND_DAY_RATE = 3.0;
	private readonly WEEKEND_EVENING_RATE = 4.1;
	private readonly WEEKEND_NIGHT_RATE = 3.5;

	private constructor(private validationService: ValidationService) {}

	static getInstance(validationService: ValidationService) {
		if (!this.instance) {
			this.instance = new CalculateFareUseCase(validationService);
		}

		return this.instance;
	}

	public async execute(request: FareRequestDTO): Promise<FareResponseDTO> {
		this.validationService.validadeFare(
			request.from,
			request.to,
			request.dateTime
		);

		const distance = this.calculateDistance(request.from, request.to);
		const tariff = this.getTariff(new Date(request.dateTime));

		const price = (distance / 1000) * tariff;

		return new FareResponseDTO({
			price: Math.round(price * 100) / 100,
			requestId: this.generateRequestId(),
			distance: Math.round(distance * 100) / 100
		});
	}

	private calculateDistance(from: LocationPoint, to: LocationPoint): number {
		const R = 6371e3;
		const p1 = (parseInt(from.latitude) * Math.PI) / 180;
		const p2 = (parseInt(to.latitude) * Math.PI) / 180;
		const deltaP = p2 - p1;
		const deltaLon = parseInt(to.longitude) - parseInt(from.longitude);
		const deltaLambda = (deltaLon * Math.PI) / 180;
		const a =
			Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
			Math.cos(p1) *
				Math.cos(p2) *
				Math.sin(deltaLambda / 2) *
				Math.sin(deltaLambda / 2);
		const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
		return d; //meters
	}

	private getTariff(date: Date): number {
		const day = date.getDay();
		const hour = date.getHours();

		const isWeekend = day === 6 || day === 0;
		const isDayTime = hour >= 8 && hour < 17;
		const isEvening = hour >= 17 && hour < 20;

		if (isWeekend) {
			if (isDayTime) return this.WEEKEND_DAY_RATE;
			if (isEvening) return this.WEEKEND_EVENING_RATE;
			return this.WEEKEND_NIGHT_RATE;
		} else {
			if (isDayTime) return this.WEEKDAY_DAY_RATE;
			if (isEvening) return this.WEEKDAY_EVENING_RATE;
			return this.WEEKDAY_NIGHT_RATE;
		}
	}

	private generateRequestId(): string {
		return Math.random().toString(36).substring(2, 13);
	}
}
