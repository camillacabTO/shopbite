import { configureStore } from '@reduxjs/toolkit';
import productDetailsReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import {
  createOrderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListUserReducer,
} from './reducers/orderReducer';
import {
  userLoginReducer,
  userSignupReducer,
  userDetailsReducer,
  userUpdateReducer,
} from './reducers/userReducer';

import {
  productListReducer,
  addReviewReducer,
} from './reducers/productsReducer';

const itemsInCartFromStorage = localStorage.getItem('itemsInCart')
  ? JSON.parse(localStorage.getItem('itemsInCart'))
  : [];

const shippingInfoFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

//preloading any cart saved in the localStorage
const initialState = {
  cart: {
    itemsInCart: itemsInCartFromStorage,
    shippingAddress: shippingInfoFromStorage,
  },
  userLogin: { user: userInfoFromStorage },
};

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    addReview: addReviewReducer,
    cart: cartReducer,
    orderCreate: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListUser: orderListUserReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
  },
  preloadedState: initialState,
});

export default store;
