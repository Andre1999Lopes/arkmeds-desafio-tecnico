import { ValidationError } from '../../domain/errors/ValidationError';
import { isValidBirthDate } from '../../utils/birthDateValidator';
import { isValidCpf } from '../../utils/cpfValidator';
import { isValidEmail } from '../../utils/emailValidator';
import { isValidPhoneNumber } from '../../utils/phoneValidator';
import { DriverDTO } from '../dtos/DriverDto';
import { PassengerDTO } from '../dtos/PassengerDto';

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
			if (!user.licenseNumber) {
				throw new ValidationError('Invalid license number');
			}

			if (!user.vehiclePlate) {
				throw new ValidationError('Invalid license number');
			}
		}
	}
}
