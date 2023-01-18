import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
  itemsInCart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const alreadyInCart = state.itemsInCart.find(
        (item) => item.product === newItem.product
      );

      if (alreadyInCart) {
        state.itemsInCart.map((item) =>
          item.product === alreadyInCart.product ? newItem : item
        );
        // update / replace item in cart if already in cart
      } else {
        state.itemsInCart.push(newItem);
      }
    },
    removeItemFromCart(state, action) {
      state.itemsInCart = state.itemsInCart.filter(
        (item) => item.product !== action.payload
      );
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
