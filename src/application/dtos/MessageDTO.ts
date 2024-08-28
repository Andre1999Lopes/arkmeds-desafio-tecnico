export class MessageDTO {
	public userId: string;
	public date: string;
	public distance: number;
	public fare: number;

	constructor(data: {
		userId: string;
		date: string;
		distance: number;
		fare: number;
	}) {
		this.userId = data.userId;
		this.date = data.date;
		this.distance = data.distance;
		this.fare = data.fare;
	}
}
