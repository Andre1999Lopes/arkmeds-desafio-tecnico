import { Driver } from '../entities/Driver';

export interface DriverRepository {
	create(driver: Driver): Promise<Driver>;
	findById(driverId: string): Promise<Driver>;
	findByCpf(driverCpf: string): Promise<Driver>;
	findAll(): Promise<Driver[]>;
	update(driver: Driver): Promise<Driver>;
	delete(driverId: string): Promise<void>;
}
