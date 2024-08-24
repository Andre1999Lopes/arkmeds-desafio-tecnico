import { Passenger } from '../entities/Passenger';

export interface PassengerRepository {
	create(passenger: Passenger): Promise<Passenger>;
	findById(passengerId: string): Promise<Passenger>;
	findAll(): Promise<Passenger[]>;
	update(passenger: Passenger): Promise<Passenger>;
	delete(passengerId: string): Promise<void>;
}
