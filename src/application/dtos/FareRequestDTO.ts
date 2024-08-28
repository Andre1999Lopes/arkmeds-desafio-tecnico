export class FareRequestDTO {
	public from: LocationPoint;
	public to: LocationPoint;
	public dateTime: string;

	constructor(data: {
		from: LocationPoint;
		to: LocationPoint;
		dateTime: string;
	}) {
		(this.from = new LocationPoint(data.from)),
			(this.to = new LocationPoint(data.to)),
			(this.dateTime = data.dateTime);
	}
}

export class LocationPoint {
	public latitude: string;
	public longitude: string;

	constructor(data: { latitude: string; longitude: string }) {
		(this.latitude = data.latitude), (this.longitude = data.longitude);
	}
}
