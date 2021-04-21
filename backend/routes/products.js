import express from 'express'
import mongoose from 'mongoose'
import Product from '../models/product.js'
const router = express.Router()

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {}
})

// @desc   Fetch single product by ID
// @route  GET /api/products/:id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    console.log(product, 'product')
    if (!product) {
      res.status(404)
      throw new Error()
    }
    res.json(product)
  } catch (error) {
    res.status(404).json({
      message: 'Product not found',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    })
  }
})

export default router
