export class Driver {
	public id: string;
	public name: string;
	public cpf: string;
	public age: number;
	public sex: string;
	public address: string;
	public phoneNumber: string;
	public email: string;
	public licenseNumber: string;
	public vehiclePlate: string;
	public birthDate: Date;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(data: {
		id: string;
		name: string;
		cpf: string;
		age: number;
		sex: string;
		address: string;
		phoneNumber: string;
		email: string;
		licenseNumber: string;
		vehiclePlate: string;
		birthDate: Date;
		createdAt: Date;
		updatedAt: Date;
	}) {
		this.id = data.id;
		this.name = data.name;
		this.cpf = data.cpf;
		this.age = data.age;
		this.sex = data.sex;
		this.address = data.address;
		this.phoneNumber = data.phoneNumber;
		this.email = data.email;
		this.licenseNumber = data.licenseNumber;
		this.vehiclePlate = data.vehiclePlate;
		this.birthDate = data.birthDate;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
