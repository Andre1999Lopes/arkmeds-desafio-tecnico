export class FareResponseDTO {
	price: number;
	requestId: string;

	constructor(data: { price: number; requestId: string }) {
		(this.price = data.price), (this.requestId = data.requestId);
	}
}
