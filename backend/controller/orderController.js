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

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//  @desc        Update order to paid
//  @route       PUT /api/orders/:id/pay
//  @access      Private
const updateToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResults = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//  @desc        List all orders of logged in user
//  @route       GET /api/orders/myOrders
//  @access      Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Orders not found');
  }
});

//  @desc        List all orders
//  @route       GET /api/orders/allOrders
//  @access      Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .select(
      '_id user createdAt isPaid isDelivered paidAt deliveredAt totalPrice'
    )
    .sort({ createdAt: '-1' });

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Orders not found');
  }
});

export { createOrder, getOrderById, updateToPaid, getMyOrders, getAllOrders };
