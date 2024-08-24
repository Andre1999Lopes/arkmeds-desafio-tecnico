import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	try {
		console.log('server is running');
	} catch (error) {}
});
