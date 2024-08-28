import { PassengerDTO } from '../../application/dtos/PassengerDTO';
import { Passenger } from '../entities/Passenger';

export interface PassengerRepository {
	create(passenger: PassengerDTO): Promise<Passenger>;
	findById(passengerId: string): Promise<Passenger | null>;
	findByCpf(passengerCpf: string): Promise<Passenger | null>;
	findByEmail(passengerEmail: string): Promise<Passenger | null>;
	findAll(): Promise<Passenger[]>;
	update(id: string, passenger: PassengerDTO): Promise<Passenger>;
	delete(passengerId: string): Promise<void>;
}
