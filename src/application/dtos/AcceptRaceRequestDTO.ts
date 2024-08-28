export class AcceptRaceRequestDTO {
	public passengerId: string;
	public driverId: string;
	public fare: string;
	public distance: string;

	constructor(data: {
		passengerId: string;
		driverId: string;
		distance: string;
		fare: string;
	}) {
		this.passengerId = data.passengerId;
		this.driverId = data.driverId;
		this.fare = data.fare;
		this.distance = data.distance;
	}
}
