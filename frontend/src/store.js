import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './reducers/productsReducer';
import productDetailsReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const itemsInCartFromStorage = localStorage.getItem('itemsInCart')
  ? JSON.parse(localStorage.getItem('itemsInCart'))
  : [];

const initialState = {
  cart: {
    itemsInCart: itemsInCartFromStorage,
    //preloading any cart saved in the localStorage
  },
};

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
  preloadedState: initialState,
});

export default store;
