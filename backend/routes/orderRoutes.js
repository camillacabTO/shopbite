import express from 'express';
const router = express.Router();
import { createOrder } from '../controllers/orderController.js';
import { auth } from '../middleware/auth.js';

router.route('/').post(auth, createOrder);
// router.route('/myorders').get(protect, getMyOrders);
// router.route('/:id').get(protect, getOrderById);
// router.route('/:id/pay').put(protect, updateOrderToPaid);
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
