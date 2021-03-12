import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select(
        '-password -__v -createdAt -updatedAt'
      );

      next();
    } catch (error) {
      res.status(401);
      console.error(error);
      throw new Error('Not Authorized, no token');
    }
  } else {
    res.status(401);

    throw new Error('Not Authorized, no token');
  }
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

export { protect, admin };
