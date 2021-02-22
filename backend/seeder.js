import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import books from './data/books.js';
import Book from './models/bookModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const importData = async () => {
  try {
    await Book.deleteMany({});

    const createdBooks = await Book.insertMany(books);
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
