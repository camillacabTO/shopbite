import { createSlice } from '@reduxjs/toolkit';

const productInitialState = {
  product: { reviews: [] },
  loading: 'idle',
  error: null,
};

const productDetailsSlice = createSlice({
  name: 'productList',
  initialState: productInitialState,
  reducers: {
    productDetailsFetch(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    productDetailsSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.product = action.payload;
    },
    productDetailsFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = action.payload;
    },
  },
});

export const {
  productDetailsFetch,
  productDetailsSuccess,
  productDetailsFail,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
