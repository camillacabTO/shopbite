import axios from 'axios'
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
  orderListUserRequest,
  orderListUserSuccess,
  orderListUserFail,
} from '../reducers/orderReducer'
import { logoutUserRequest } from '../reducers/userReducer.js'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(createOrderRequest())

    const {
      userLogin: { user },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)
    console.log('created order', data)

    dispatch(createOrderSuccess(data))
    //cart clean items
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized') {
      dispatch(logoutUserRequest())
    }
    dispatch(createOrderFail(message))
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest())

    const {
      userLogin: { user },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch(orderDetailsSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized') {
      dispatch(logoutUserRequest())
    }
    dispatch(orderDetailsFail(message))
  }
}

export const payOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderPayRequest())

    const {
      userLogin: { user },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      { result: 'success' },
      config
    )

    dispatch(orderPaySuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized') {
      dispatch(logoutUserRequest())
    }
    dispatch(orderPayFail(message))
  }
}

export const listUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListUserRequest())

    const {
      userLogin: { user },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch(orderListUserSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized') {
      dispatch(logoutUserRequest())
    }
    dispatch(orderListUserFail(message))
  }
}
