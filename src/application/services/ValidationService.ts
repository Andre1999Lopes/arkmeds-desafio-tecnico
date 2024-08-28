import { AcceptRaceRequestDTO } from '../../application/dtos/AcceptRaceRequestDTO';
import { ValidationError } from '../../domain/errors/ValidationError';
import { isValidBirthDate } from '../../utils/birthDateValidator';
import { isValidCpf } from '../../utils/cpfValidator';
import { isValidDateTime } from '../../utils/dateTimeValidator';
import { isValidEmail } from '../../utils/emailValidator';
import { isValidPhoneNumber } from '../../utils/phoneValidator';
import { isValidUuid } from '../../utils/uuidValidator';
import { DriverDTO } from '../dtos/DriverDTO';
import { LocationPoint } from '../dtos/FareRequestDTO';
import { PassengerDTO } from '../dtos/PassengerDTO';

export class ValidationService {
	private static instance: ValidationService;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ValidationService();
		}

		return this.instance;
	}

	private validateCommonData(
		data: {
			name?: string;
			cpf?: string;
			age?: string;
			sex?: string;
			address?: string;
			email?: string;
			phoneNumber?: string;
			birthDate?: string;
		},
		isCreation: boolean
	) {
		if (isCreation || data.name) {
			if (!data.name?.trim()) {
				throw new ValidationError('Name is required');
			}
		}

		if (isCreation || data.cpf) {
			if (!isValidCpf(data.cpf)) {
				throw new ValidationError('Invalid CPF');
			}
		}

		if (isCreation || data.age) {
			if (!data.age || isNaN(parseInt(data.age))) {
				throw new ValidationError('Invalid age');
			}
		}

		if (isCreation || data.address) {
			if (!data.address?.trim()) {
				throw new ValidationError('Address is required');
			}
		}

		if (isCreation || data.email) {
			if (!isValidEmail(data.email)) {
				throw new ValidationError('Invalid email');
			}
		}

		if (isCreation || data.phoneNumber) {
			if (!isValidPhoneNumber(data.phoneNumber)) {
				throw new ValidationError('Invalid phone number');
			}
		}

		if (isCreation || data.birthDate) {
			if (!isValidBirthDate(data.birthDate)) {
				throw new ValidationError('Invalid birth date');
			}
		}
	}

	validateUser(user: DriverDTO | PassengerDTO, isCreation: boolean) {
		this.validateCommonData(
			{
				name: user.name,
				cpf: user.cpf,
				age: user.age,
				sex: user.sex,
				address: user.address,
				email: user.email,
				phoneNumber: user.phoneNumber,
				birthDate: user.birthDate
			},
			isCreation
		);

		if (user instanceof DriverDTO) {
			if (isCreation || !!user.licenseNumber) {
				if (!user.licenseNumber) {
					throw new ValidationError('Invalid license number');
				}
			}

			if (isCreation || !!user.vehiclePlate) {
				if (!user.vehiclePlate) {
					throw new ValidationError('Invalid vehicle plate');
				}
			}
		}
	}

	validadeFare(from: LocationPoint, to: LocationPoint, date: string) {
		if (
			isNaN(parseInt(from.latitude)) ||
			isNaN(parseInt(from.longitude)) ||
			parseInt(from.latitude) <= -90 ||
			parseInt(from.latitude) >= 90 ||
			parseInt(from.latitude) <= -180 ||
			parseInt(from.longitude) >= 180
		) {
			throw new ValidationError('Invalid initial geolocalization');
		}

		if (
			isNaN(parseInt(to.latitude)) ||
			isNaN(parseInt(to.longitude)) ||
			parseInt(to.latitude) <= -90 ||
			parseInt(to.latitude) >= 90 ||
			parseInt(to.latitude) <= -180 ||
			parseInt(to.longitude) >= 180
		) {
			throw new ValidationError('Invalid final geolocalization');
		}

		if (!isValidDateTime(date)) {
			throw new ValidationError('Invalid date');
		}
	}

	validateRace(race: AcceptRaceRequestDTO) {
		if (!race.driverId || !isValidUuid(race.driverId)) {
			throw new ValidationError('Invalid Driver ID');
		}

		if (!race.passengerId || !isValidUuid(race.passengerId)) {
			throw new ValidationError('Invalid Driver ID');
		}

		if (!race.distance || isNaN(parseFloat(race.distance))) {
			throw new ValidationError('Invalid distance');
		}

		if (!race.fare || isNaN(parseFloat(race.fare))) {
			throw new ValidationError('Invalid fare');
		}
	}

	validateUuid(uuid: string) {
		if (!isValidUuid(uuid)) {
			throw new ValidationError('Invalid UUID');
		}
	}
}
