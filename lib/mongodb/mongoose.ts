import mongoose, { ConnectOptions } from 'mongoose';

let initialized: boolean = false;

export const connect = async (): Promise<void> => {
  mongoose.set('strictQuery', true);
  
  if (initialized) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: 'next-blog',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log('Connected to MongoDB');
    initialized = true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
