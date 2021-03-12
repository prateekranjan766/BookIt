import express from 'express';
import {
  createOrder,
  getOrderById,
  updateToPaid,
  getMyOrders,
  getAllOrders,
} from './../controller/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/myOrders').get(protect, getMyOrders);
router.route('/allOrders').get(protect, admin, getAllOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateToPaid);

export default router;
