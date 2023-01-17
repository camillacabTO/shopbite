import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './reducers/productsReducer';
import productDetailsReducer from './reducers/productReducer';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
