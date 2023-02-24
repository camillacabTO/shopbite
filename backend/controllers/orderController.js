import Order from '../models/order.js'
import mongoose from 'mongoose'

export const createOrder = async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (items && items.length === 0) {
    res.status(400)
    throw new Error('No items in your order')
  } else {
    const order = new Order({
      items,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
}

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'email name'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('No order found')
  }
}

export const payOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    console.log('pay updated')
    // simulates order being paid
    const updatedPaidOrder = await order.save()
    res.json(updatedPaidOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

// // @desc    Update order to delivered
// // @route   GET /api/orders/:id/deliver
// // @access  Private/Admin
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     order.isDelivered = true;
//     order.deliveredAt = Date.now();

//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error('Order not found');
//   }
// });

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
// const getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate('user', 'id name');
//   res.json(orders);
// });
