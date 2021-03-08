import asyncHandler from 'express-async-handler';
import Order from './../models/orderModel.js';

//  @desc        Create new Order
//  @route       POST /api/orders
//  @access      Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
  }

  const order = new Order({
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

//  @desc        Get order by ID
//  @route       GET /api/orders/:id
//  @access      Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  res.json(order);
});

export { createOrder, getOrderById };
