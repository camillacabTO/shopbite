import axios from 'axios';
import {
  productListFetch,
  productListSuccess,
  productListFail,
} from '../reducers/productsReducer';

import {
  productDetailsFetch,
  productDetailsSuccess,
  productDetailsFail,
} from '../reducers/productReducer';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(productListFetch());
    const { data } = await axios.get('/api/products');
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(productListFail(error.message));
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsFetch());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(productDetailsSuccess(data));
  } catch (error) {
    dispatch(productDetailsFail(error.message));
  }
};
