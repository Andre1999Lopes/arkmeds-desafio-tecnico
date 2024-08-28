export class MessageDTO {
	public passengerId: string;
	public driverId: string;
	public date: string;
	public distance: number;
	public fare: number;

	constructor(data: {
		passengerId: string;
		driverId: string;
		date: string;
		distance: number;
		fare: number;
	}) {
		this.passengerId = data.passengerId;
		this.driverId = data.driverId;
		this.date = data.date;
		this.distance = data.distance;
		this.fare = data.fare;
	}
}
