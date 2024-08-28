import 'dotenv/config';
import { KafkaConsumer } from '../infra/queue/consumer/KafkaConsumer';
import app from './app';
import { prisma } from './prisma/client';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	try {
		console.log('server is running');
		await prisma.$connect();
		console.log('Database connected');
		await KafkaConsumer.getInstance().connect();
	} catch (error) {
		console.log(
			'Error initializion server:',
			JSON.stringify(error, null, '\t')
		);
		process.exit(1);
	}
});
