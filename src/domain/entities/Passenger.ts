import { Ride } from './Ride';

export class Passenger {
	public id: string;
	public name: string;
	public cpf: string;
	public age: number;
	public sex: string;
	public address: string;
	public phoneNumber: string;
	public email: string;
	public birthDate: Date;
	public createdAt: Date;
	public updatedAt: Date;
	public rides: Ride[];

	constructor(data: {
		id: string;
		name: string;
		cpf: string;
		age: number;
		sex: string;
		address: string;
		phoneNumber: string;
		email: string;
		birthDate: Date;
		createdAt: Date;
		updatedAt: Date;
		rides: Ride[];
	}) {
		this.id = data.id;
		this.name = data.name;
		this.cpf = data.cpf;
		this.age = data.age;
		this.sex = data.sex;
		this.address = data.address;
		this.phoneNumber = data.phoneNumber;
		this.email = data.email;
		this.birthDate = data.birthDate;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
		this.rides = data.rides;
	}
}
