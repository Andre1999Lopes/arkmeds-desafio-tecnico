export class AcceptRaceRequestDTO {
	public userId: string;
	public fare: string;
	public distance: number;

	constructor(data: { userId: string; distance: number; fare: string }) {
		this.userId = data.userId;
		this.fare = data.fare;
		this.distance = data.distance;
	}
}
