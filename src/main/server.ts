import 'dotenv/config';
import app from './app';
import { prisma } from './prisma/client';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	try {
		console.log('server is running');
		await prisma.$connect();
		console.log('Database connected');
	} catch (error) {
		console.log(
			'Error connecting to database:',
			JSON.stringify(error, null, '\t')
		);
		process.exit(1);
	}
});
