import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import books from './data/books.js';
import users from './data/users.js';
import Book from './models/bookModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const importData = async () => {
  try {
    await Book.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    const createdUsers = await User.insertMany(users);

    const sampleBooks = books.map((book) => {
      book.user = createdUsers[0];
      return book;
    });

    const createdBooks = await Book.insertMany(sampleBooks);
    console.log('success'.green.underline);
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    console.log('Data Destroyed.'.red.underline);
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
