import express from 'express';
import {
  getTrendingBooksByCategory,
  getBookDescription,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  createBookReview,
} from './../controller/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createBook);
router.route('/allBooks').get(protect, admin, getAllBooks);
router
  .route('/:id')
  .get(getBookDescription)
  .put(protect, admin, updateBook)
  .delete(protect, admin, deleteBook);
router.route('/:category/:count').get(getTrendingBooksByCategory);
router.route('/:id/reviews').post(protect, createBookReview);

export default router;
