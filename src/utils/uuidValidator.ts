import { validate } from 'uuid';

export function isValidUuid(uuid: string) {
	return validate(uuid);
}
