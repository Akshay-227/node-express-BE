import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import { DB_NAME } from '../constants';

const connectDB = async (): Promise<void> => {
  try {
    const encodedConnectionString = process.env.MONGODB_URL!.replace(
      '{password}',
      encodeURIComponent(process.env.MONGODB_PASSWORD!)
    );
    console.log(encodedConnectionString);
    const connectionInstance: Mongoose = await mongoose.connect(`${encodedConnectionString}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(`MongoDB connected!! DB Host: ${connectionInstance.connection.host}`);
  } catch (error: any) {
    console.error('Mongodb connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
