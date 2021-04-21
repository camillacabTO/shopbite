import axios from 'axios'
import {
  PRODUCT_LIST_FETCH,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../constants/productConstants'

//action generator
export const fetchProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_FETCH })
    //initialize process. Dispatch action
    const { data } = await axios.get('/api/products')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
  }
}
