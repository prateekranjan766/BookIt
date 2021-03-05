import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
} from './../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/').post(registerUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
