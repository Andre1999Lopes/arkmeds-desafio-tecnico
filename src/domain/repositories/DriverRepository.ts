import { CreateDriverDTO } from '../../application/dtos/CreateDriverDto';
import { Driver } from '../entities/Driver';

export interface DriverRepository {
	create(driver: CreateDriverDTO): Promise<Driver>;
	findById(driverId: string): Promise<Driver | null>;
	findByCpf(driverCpf: string): Promise<Driver | null>;
	findByEmail(driverEmail: string): Promise<Driver | null>;
	findByLicenseNumber(licenseNumber: string): Promise<Driver | null>;
	findAll(): Promise<Driver[]>;
	update(driver: Driver): Promise<Driver>;
	delete(driverId: string): Promise<void>;
}
