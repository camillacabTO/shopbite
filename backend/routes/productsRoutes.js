import express from 'express';
import {
  getAllProducts,
  getProductByID,
  addReview,
} from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/:id/reviews').post(auth, addReview);
// router.get('/top', getTopProducts);
router.route('/:id').get(getProductByID);

export default router;
