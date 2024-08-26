import { CreatePassengerDTO } from '../../application/dtos/CreatePassengerDto';
import { Passenger } from '../entities/Passenger';

export interface PassengerRepository {
	create(passenger: CreatePassengerDTO): Promise<Passenger>;
	findById(passengerId: string): Promise<Passenger | null>;
	findByCpf(passengerCpf: string): Promise<Passenger | null>;
	findByEmail(passengerEmail: string): Promise<Passenger | null>;
	findAll(): Promise<Passenger[]>;
	update(passenger: Passenger): Promise<Passenger>;
	delete(passengerId: string): Promise<void>;
}
