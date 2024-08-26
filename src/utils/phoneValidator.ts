export function isValidPhoneNumber(phone: string): boolean {
	const phoneRegex = /^(?:\+55\s?)?(?:\(?\d{2}\)?[\s.-]?)?\d{4,5}[-.\s]?\d{4}$/;
	return phoneRegex.test(phone);
}
