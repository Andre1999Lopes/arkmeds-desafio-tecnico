import { CreateDriverDTO } from '../../application/dtos/CreateDriverDto';
import { Driver } from '../entities/Driver';

export interface DriverRepository {
	create(driver: CreateDriverDTO): Promise<Driver>;
	findById(driverId: string): Promise<Driver>;
	findByCpf(driverCpf: string): Promise<Driver>;
	findAll(): Promise<Driver[]>;
	update(driver: Driver): Promise<Driver>;
	delete(driverId: string): Promise<void>;
}
