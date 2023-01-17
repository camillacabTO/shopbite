import {
  PRODUCT_LIST_FETCH,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FETCH,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

// delete constants. Create slice (reducer + actions). Add initial state (default state objects)
// add store provider in App.js. configure store.js (add reducers)

const productsDefaultState = { products: [], loading: false, error: null };

export const productListReducer = (state = productsDefaultState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_FETCH:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDefaultState = {
  product: { reviews: [] },
  loading: false,
  error: null,
};
// a default product has a empty array of reviews

export const productDetailsReducer = (state = productDefaultState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_FETCH:
      return { loading: true, ...state };
    //add the default product info
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export actions and reducers separetely
