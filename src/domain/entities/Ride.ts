export class Ride {
	public id: string;
	public passengerId: string;
	public driverId: string;
	public fare: number;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(data: {
		id: string;
		passengerId: string;
		driverId: string;
		fare: number;
		createdAt: Date;
		updatedAt: Date;
	}) {
		this.id = data.id;
		this.passengerId = data.passengerId;
		this.driverId = data.driverId;
		this.fare = data.fare;
		this.createdAt = data.createdAt;
		this.updatedAt = data.updatedAt;
	}
}
