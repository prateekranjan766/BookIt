import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateToPaid,
  updateToDispatched,
  updateToShipped,
  updateToDelivered,
} from './../controller/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/myOrders').get(protect, getMyOrders);
router.route('/allOrders').get(protect, admin, getAllOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateToPaid);
router.route('/:id/dispatch').put(protect, admin, updateToDispatched);
router.route('/:id/ship').put(protect, admin, updateToShipped);
router.route('/:id/deliver').put(protect, admin, updateToDelivered);

export default router;
