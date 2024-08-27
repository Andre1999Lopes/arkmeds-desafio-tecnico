export function isValidDateTime(dateTime: string): boolean {
	const date = new Date(dateTime);
	return !isNaN(date.getTime());
}
