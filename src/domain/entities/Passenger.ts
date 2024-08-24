import { Ride } from './Ride';

export class Passenger {
	constructor(
		public id: string,
		public name: string,
		public cpf: string,
		public age: number,
		public sex: string,
		public address: string,
		public phoneNumber: string,
		public email: string,
		public createdAt: Date,
		public updatedAt: Date,
		public ride: Ride[]
	) {}
}
