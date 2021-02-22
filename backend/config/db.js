import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected to ${conn.connection.host}`.green.inverse);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
