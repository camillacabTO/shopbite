import axios from 'axios';
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
} from '../reducers/orderReducer';
import { logoutUserRequest } from '../reducers/userReducer.js';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(createOrderRequest());

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch(createOrderSuccess(data));
    //cart clean items
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized') {
      dispatch(logoutUserRequest());
    }
    dispatch(createOrderFail(message));
  }
};
