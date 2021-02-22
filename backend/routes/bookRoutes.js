import express from 'express';
import getTrendingBooksByCategory from './../controller/bookController.js';

const router = express.Router();

router.route('/:category/:count').get(getTrendingBooksByCategory);

export default router;
