export function isValidBirthDate(date: string): boolean {
	const birthDate = new Date(date);
	const today = new Date();

	if (birthDate.toString() === 'Invalid Date') return false;

	if (birthDate > today) return false;

	return true;
}
