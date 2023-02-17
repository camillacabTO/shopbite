import axios from 'axios'
import {
  productListFetch,
  productListSuccess,
  productListFail,
  addReviewFetch,
  addReviewSuccess,
  addReviewFail,
} from '../reducers/productsReducer'

import {
  productDetailsFetch,
  productDetailsSuccess,
  productDetailsFail,
} from '../reducers/productReducer'
import { logoutUserRequest } from '../reducers/userReducer'

export const fetchProducts =
  (query = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch(productListFetch())
      const { data } = await axios.get(
        `/api/products?product=${query}&pageNum=${page}`
      )
      dispatch(productListSuccess(data))
    } catch (error) {
      dispatch(productListFail(error.message))
    }
  }

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsFetch())
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(productDetailsSuccess(data))
  } catch (error) {
    dispatch(productDetailsFail(error.message))
  }
}

export const createReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(addReviewFetch())

      const {
        userLogin: { user },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      await axios.post(`/api/products/${productId}/reviews`, review, config)

      dispatch(addReviewSuccess())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized') {
        dispatch(logoutUserRequest())
      }
      dispatch(addReviewFail(message))
    }
  }
