import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

//  @desc        Get all trending books by category
//  @route       GET /api/books/:category/:count
//  @access      public
const getTrendingBooksByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category || 'novels';
  const count = req.params.count || 5;

  const books = await Book.find({ category: category })
    .sort({ rating: -1 })
    .limit(Number(count));
  res.json(books);
});

//  @desc        Get all books in sorted way
//  @route       GET /api/books/bookScreen/:sortBy
//  @access      public
const getBooksBySorting = asyncHandler(async (req, res) => {
  const category = req.query.category
    ? {
        category: { $eq: req.query.category },
      }
    : {};
  const rating = req.query.rating
    ? {
        rating: {
          $gt: req.query.rating,
        },
      }
    : {};
  const price = req.query.price
    ? {
        price: {
          $lt: req.query.price,
        },
      }
    : {};
  const pages = req.query.pages
    ? {
        numOfPages: {
          $lt: req.query.pages,
        },
      }
    : {};
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const sortBy = req.params.sortBy;
  const x =
    sortBy === 'price-high-low'
      ? { price: -1 }
      : sortBy === 'price-low-high'
      ? { price: 1 }
      : { rating: -1 };
  const books = await Book.find({
    ...keyword,
    ...category,
    ...pages,
    ...price,
    ...rating,
  }).sort(x);

  if (books) {
    res.json(books);
  } else {
    res.status(404);
    throw new Error('Books not found!');
  }
});

//  @desc        Get book description
//  @route       GET /api/books/:id
//  @access      public
const getBookDescription = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found!');
  }
});

//  @desc        Get all books
//  @route       GET /api/books/allBooks
//  @access      Admin
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  if (books) {
    res.json(books);
  } else {
    res.status(404);
    throw new Error('Books not found!');
  }
});

//  @desc        Create a new book
//  @route       POST /api/books
//  @access      Admin
const createBook = asyncHandler(async (req, res) => {
  const book = new Book({
    user: req.user._id,
    title: 'Sample Title',
    author: ['Sample Author'],
    description: 'Sample Description',
    category: 'Sample Category',
    language: 'Sample Language',
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

//  @desc        Update a book
//  @route       PUT /api/books/:id
//  @access      Admin
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    const {
      title,
      author,
      description,
      category,
      language,
      countInStock,
      genre,
      mrp,
      discount,
      image,
      length,
      breadth,
      height,
      numOfPages,
      weight,
    } = req.body;

    book.title = title;
    book.author = author;
    book.description = description;
    book.category = category;
    book.language = language;
    book.countInStock = countInStock;
    book.genre = genre;
    book.mrp = mrp;
    book.discount = discount;
    book.image = image;
    book.dimensions.length = length;
    book.dimensions.breadth = breadth;
    book.dimensions.height = height;
    book.numOfPages = numOfPages;
    book.weight = weight;

    book.price = (((100 - book.discount) * book.mrp) / 100).toFixed(2);

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

//  @desc        Delete a book
//  @route       DELETE /api/books/:id
//  @access      Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.send('Deleted');
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

//  @desc        Create a book review
//  @route       POST /api/books/:id/reviews
//  @access      Private
const createBookReview = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    const { rating, comment } = req.body;

    const isReviewed = book.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      res.status(400);
      throw new Error('Book already reviewed!');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    book.reviews.push(review);

    book.numReviews = book.reviews.length;

    book.rating =
      book.reviews.reduce((acc, item) => acc + item.rating, 0) /
      book.reviews.length;

    await book.save();

    res.status(201).json({ message: 'Review Created' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

export {
  getTrendingBooksByCategory,
  getBookDescription,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  createBookReview,
  getBooksBySorting,
};
