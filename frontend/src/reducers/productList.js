import {
  PRODUCT_LIST_FETCH,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../constants/productConstants'

const productDefaultState = { products: [], loading: false, error: null }

export const productListReducer = (state = productDefaultState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_FETCH:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
