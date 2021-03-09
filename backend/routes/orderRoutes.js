import express from 'express';
import {
  createOrder,
  getOrderById,
  updateToPaid,
} from './../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateToPaid);

export default router;
