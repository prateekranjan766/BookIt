import express from 'express';
import {
  getTrendingBooksByCategory,
  getBookDescription,
} from './../controller/bookController.js';

const router = express.Router();

router.route('/:id').get(getBookDescription);
router.route('/:category/:count').get(getTrendingBooksByCategory);

export default router;
