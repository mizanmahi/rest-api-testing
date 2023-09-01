import connectDb from './utils/db';
import createServer from './server';

require('dotenv').config();

const app = createServer();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
   await connectDb();
   console.log(`App is running at http://localhost:${PORT}`);
});
