export class PassengerDTO {
	public name: string;
	public cpf: string;
	public age: string;
	public sex: string;
	public address: string;
	public phoneNumber: string;
	public email: string;
	public birthDate: string;

	constructor(data: {
		name: string;
		cpf: string;
		age: string;
		sex: string;
		address: string;
		phoneNumber: string;
		email: string;
		birthDate: string;
	}) {
		this.name = data.name;
		this.cpf = data.cpf;
		this.age = data.age;
		this.sex = data.sex;
		this.address = data.address;
		this.phoneNumber = data.phoneNumber;
		this.email = data.email;
		this.birthDate = data.birthDate;
	}
}
