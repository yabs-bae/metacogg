import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(`mongodb://localhost:27017/mataco_gg`);
};

export { connectToDatabase };