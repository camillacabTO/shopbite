import mongoose from 'mongoose'
import Review from './review.js'

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    rating: {
      type: Number,
      required: true,
      default: 0
      //average of all reviews rating
    },
    reviews: [Review],
    // array of other Schema
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    numInStock: {
      type: Number,
      required: true,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
