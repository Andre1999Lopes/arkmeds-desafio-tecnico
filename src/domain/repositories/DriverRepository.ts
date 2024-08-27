import { DriverDTO } from '../../application/dtos/DriverDto';
import { Driver } from '../entities/Driver';

export interface DriverRepository {
	create(driver: DriverDTO): Promise<Driver>;
	findById(driverId: string): Promise<Driver | null>;
	findByCpf(driverCpf: string): Promise<Driver | null>;
	findByEmail(driverEmail: string): Promise<Driver | null>;
	findByLicenseNumber(licenseNumber: string): Promise<Driver | null>;
	findAll(): Promise<Driver[]>;
	update(id: string, driver: DriverDTO): Promise<Driver>;
	delete(driverId: string): Promise<void>;
}
