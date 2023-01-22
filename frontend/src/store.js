import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './reducers/productsReducer';
import productDetailsReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import {
  userLoginReducer,
  userSignupReducer,
  userDetailsReducer,
} from './reducers/userReducer';

const itemsInCartFromStorage = localStorage.getItem('itemsInCart')
  ? JSON.parse(localStorage.getItem('itemsInCart'))
  : [];

const userInfoFromStorage = localStorage.getItem('itemsInCart')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

//preloading any cart saved in the localStorage
const initialState = {
  cart: {
    itemsInCart: itemsInCartFromStorage,
  },
  userLogin: { user: userInfoFromStorage },
};

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userDetails: userDetailsReducer,
  },
  preloadedState: initialState,
});

export default store;
