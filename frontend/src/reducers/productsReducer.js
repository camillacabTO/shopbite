import { createSlice } from '@reduxjs/toolkit'

const productsInitialState = { products: [], loading: 'idle', error: null }

// First, define the reducer and action creators via `createSlice`
const productListSlice = createSlice({
  name: 'productList',
  initialState: productsInitialState,
  reducers: {
    productListFetch(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    productListSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.products = action.payload.products
      state.totalPages = action.payload.totalPages
      state.page = action.payload.page
      state.error = null
    },
    productListFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = action.payload
    },
  },
})

export const { productListFetch, productListSuccess, productListFail } =
  productListSlice.actions

export const productListReducer = productListSlice.reducer

const addReviewInitialState = { loading: 'idle', error: null, success: false }

// First, define the reducer and action creators via `createSlice`
const addReviewSlice = createSlice({
  name: 'addReview',
  initialState: addReviewInitialState,
  reducers: {
    addReviewFetch(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    addReviewSuccess(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.success = true
      state.error = null
    },
    addReviewFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = action.payload
    },
    addReviewReset(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
      state.error = null
      state.success = false
    },
  },
})

export const {
  addReviewFetch,
  addReviewSuccess,
  addReviewFail,
  addReviewReset,
} = addReviewSlice.actions

export const addReviewReducer = addReviewSlice.reducer
