export function isValidCpf(cpf?: string): boolean {
	if (!cpf) {
		return false;
	}

	const cpfStr = cpf.replace(/[^\d]+/g, '');

	if (cpfStr.length !== 11) {
		return false;
	}

	const firstSum = cpfStr
		.split('')
		.slice(0, 9)
		.reduce((acc, num, i) => acc + parseInt(num, 10) * (10 - i), 0);

	const firstCheckDigit = ((firstSum * 10) % 11) % 10;
	const secondSum = cpfStr
		.split('')
		.slice(0, 10)
		.reduce((acc, num, i) => acc + parseInt(num, 10) * (11 - i), 0);
	const secondCheckDigit = ((secondSum * 10) % 11) % 10;

	return (
		cpfStr[9] === String(firstCheckDigit) &&
		cpfStr[10] === String(secondCheckDigit)
	);
}
