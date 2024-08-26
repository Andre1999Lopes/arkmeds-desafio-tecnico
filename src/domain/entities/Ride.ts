export class Ride {
	constructor(
		public id: string,
		public passengerId: string,
		public driverId: string,
		public fare: number,
		public createdAt: Date,
		public updatedAt: Date
	) {}
}
