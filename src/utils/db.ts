import mongoose from 'mongoose';

async function connectDb() {
   try {
      await mongoose.connect(process.env.DB_URL as string);
      console.log(`🛢 Database is connected successfully`);
   } catch (err) {
      console.log('Failed to connect database', err);
   }
}

export default connectDb;
