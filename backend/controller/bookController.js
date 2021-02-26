import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

//  @desc        Get all trending books by category
//  @route       GET /api/books
//  @access      public
const getTrendingBooksByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category || 'novels';
  const count = req.params.count || 5;

  const books = await Book.find({ category: category })
    .sort({ rating: -1 })
    .limit(Number(count));
  res.json(books);
});

//  @desc        Get book description
//  @route       GET /api/books/:id
//  @access      public
const getBookDescription = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

export { getTrendingBooksByCategory, getBookDescription };
