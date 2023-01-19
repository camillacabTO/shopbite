import express from 'express';
import {
  getAllProducts,
  getProductByID,
} from '../controllers/productController.js';
const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/:id').get(getProductByID);

export default router;
