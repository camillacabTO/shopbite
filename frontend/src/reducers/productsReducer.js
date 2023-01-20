import { createSlice } from '@reduxjs/toolkit';

const productsInitialState = { products: [], loading: 'idle', error: null };

// First, define the reducer and action creators via `createSlice`
const productListSlice = createSlice({
  name: 'productList',
  initialState: productsInitialState,
  reducers: {
    productListFetch(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    productListSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.products = action.payload;
      state.error = null;
    },
    productListFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = action.payload;
    },
  },
});

export const { productListFetch, productListSuccess, productListFail } =
  productListSlice.actions;

export default productListSlice.reducer;
