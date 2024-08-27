export class FareResponseDTO {
	price: number;
	requestId: string;
	distance: number;

	constructor(data: { price: number; requestId: string; distance: number }) {
		this.price = data.price;
		this.requestId = data.requestId;
		this.distance = data.distance;
	}
}
