import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    const encodedConnectionString = process.env.MONGODB_URL.replace(
      '{password}',
      encodeURIComponent(process.env.MONGODB_PASSWORD)
    );
    console.log(encodedConnectionString);
    const connectionInstance = await mongoose.connect(`${encodedConnectionString}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected!! DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('Mongodb connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
