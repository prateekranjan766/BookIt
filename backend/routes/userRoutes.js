import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  getUserProfileDetails,
  updateUserProfileDetails,
  getAllUsers,
  deleteUserById,
  getUserProfileById,
  updateUserById,
} from './../controller/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/').post(registerUser);
router.route('/profile').get(protect, getUserProfile);
router
  .route('/profile/:id/edit')
  .get(protect, admin, getUserProfileById)
  .put(protect, admin, updateUserById);
router
  .route('/profile/details')
  .get(protect, getUserProfileDetails)
  .put(protect, updateUserProfileDetails);
router.route('/allUsers').get(protect, admin, getAllUsers);
router.route('/:id').delete(protect, admin, deleteUserById);

export default router;
