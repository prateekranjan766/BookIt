import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

//  @desc        Get all trending books by category
//  @route       GET /api/books
//  @access      public
const getTrendingBooksByCategory = async (req, res) => {
  const category = req.params.category || 'novels';
  const count = req.params.count || 5;
  try {
    const books = await Book.find({ category: category })
      .sort({ rating: -1 })
      .limit(Number(count));
    res.json(books);
  } catch (error) {
    console.error(error.message);
  }
};

export default getTrendingBooksByCategory;
