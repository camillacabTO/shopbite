import express from 'express'
const router = express.Router()
import {
  createOrder,
  getOrderById,
  payOrder,
  getUserOrders,
} from '../controllers/orderController.js'
import { auth } from '../middleware/auth.js'

router.route('/').post(auth, createOrder)
router.route('/myorders').get(auth, getUserOrders)
router.route('/:id').get(auth, getOrderById)
router.route('/:id/pay').put(auth, payOrder)

export default router
