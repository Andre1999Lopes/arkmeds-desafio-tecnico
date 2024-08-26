import { isValidBirthDate } from '../../utils/birthDateValidator';
import { isValidCpf } from '../../utils/cpfValidator';
import { isValidEmail } from '../../utils/emailValidator';
import { isValidPhoneNumber } from '../../utils/phoneValidator';

export class ValidationService {
	private static instance: ValidationService;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ValidationService();
		}

		return this.instance;
	}

	validatePassengerOrDriver(data: {
		cpf: string;
		email: string;
		phoneNumber: string;
		birthDate: string;
	}) {
		if (!isValidCpf(data.cpf)) {
			throw new Error('Invalid CPF');
		}

		if (!isValidEmail(data.email)) {
			throw new Error('Invalid email');
		}

		if (!isValidPhoneNumber(data.phoneNumber)) {
			throw new Error('Invalid phone number');
		}

		if (!isValidBirthDate(data.birthDate)) {
			throw new Error('Invalid birth date');
		}
	}
}
