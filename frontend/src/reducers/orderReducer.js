import { createSlice } from '@reduxjs/toolkit'

const createOrderInitialState = {
  order: {},
  loading: 'idle',
  error: null,
  success: false,
}
const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState: createOrderInitialState,
  reducers: {
    createOrderRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    createOrderSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.order = action.payload
      state.error = null
      state.success = true
    },
    createOrderFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = action.payload
      state.success = false
    },
    createOrderReset(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = null
      state.updated = false
      state.order = {}
      state.success = false
    },
  },
})

export const createOrderReducer = createOrderSlice.reducer

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  createOrderReset,
} = createOrderSlice.actions

const orderDetailsInitialState = {
  order: [],
  loading: 'pending',
  error: null,
}
const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: orderDetailsInitialState,
  reducers: {
    orderDetailsRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    orderDetailsSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.order = action.payload
      state.error = null
    },
    orderDetailsFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = action.payload
    },
  },
})

export const orderDetailsReducer = orderDetailsSlice.reducer

export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } =
  orderDetailsSlice.actions

const orderPayInitialState = {
  loading: 'idle',
  error: null,
  success: false,
}
const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: orderPayInitialState,
  reducers: {
    orderPayRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    orderPaySuccess(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.success = true
      state.error = null
    },
    orderPayFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = action.payload
    },
    orderPayReset(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = null
      state.success = false
    },
  },
})

export const orderPayReducer = orderPaySlice.reducer

export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } =
  orderPaySlice.actions

const orderListUserInitialState = {
  loading: 'idle',
  error: null,
  orders: [],
}
const orderListUserSlice = createSlice({
  name: 'orderListUser',
  initialState: orderListUserInitialState,
  reducers: {
    orderListUserRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    orderListUserSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.orders = action.payload
      state.error = null
    },
    orderListUserFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = action.payload
    },
    orderListUserReset(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = null
      state.orders = []
    },
  },
})

export const orderListUserReducer = orderListUserSlice.reducer

export const {
  orderListUserRequest,
  orderListUserSuccess,
  orderListUserFail,
  orderListUserReset,
} = orderListUserSlice.actions
