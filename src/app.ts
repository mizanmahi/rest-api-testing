import { app } from './server';
import connectDb from './utils/db';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
   await connectDb();
   console.log(`✈️  App is running at http://localhost:${PORT}`);
});
