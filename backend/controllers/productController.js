import Product from '../models/Product.js'

export const getAllProducts = async (req, res, next) => {
  const page = Number(req.query.pageNum) || 1
  const pageLength = 2

  const searchTerm = req.query.product
    ? {
        name: {
          $regex: req.query.product,
          $options: 'i',
        },
      }
    : {}

  try {
    const countDocs = await Product.countDocuments({ ...searchTerm })
    const products = await Product.find({ ...searchTerm })
      .limit(pageLength)
      .skip(pageLength * (page - 1))

    res.json({ products, page, totalPages: Math.ceil(countDocs / pageLength) })
  } catch (error) {
    next(error)
  }
}

export const getProductByID = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}

//review controllers

export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      const existingReviews = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      )

      if (existingReviews) {
        res.status(400)
        throw new Error('You have already reviewed this product')
      }

      const newReview = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      }

      product.reviews.push(newReview)

      //calc average rating
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      //update number of reviews
      product.numReviews = product.reviews.length
      await product.save()
      res.status(201).json({ message: 'Your review has been added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    next(error)
  }
}

// const getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({}).sort({ rating: -1 }).limit(3)

//   res.json(products)
// })
