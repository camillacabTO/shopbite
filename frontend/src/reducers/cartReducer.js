import { createSlice } from '@reduxjs/toolkit'

const cartInitialState = {
  itemsInCart: [],
  shippingAddress: {},
  paymentMethod: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload
      const alreadyInCart = state.itemsInCart.find(
        (item) => item.product === newItem.product
      )

      if (alreadyInCart) {
        state.itemsInCart = state.itemsInCart.map((item) =>
          item.product === newItem.product ? newItem : item
        )
        // update / replace item in cart if already in cart
      } else {
        state.itemsInCart.push(newItem)
      }
    },
    removeItemFromCart(state, action) {
      state.itemsInCart = state.itemsInCart.filter(
        (item) => item.product !== action.payload
      )
    },
    addShippingAddress(state, action) {
      state.shippingAddress = action.payload
    },
    addPaymentMethod(state, action) {
      state.paymentMethod = action.payload
    },
    cartReset(state) {
      state.itemsInCart = []
    },
  },
})

export const {
  addItemToCart,
  removeItemFromCart,
  addShippingAddress,
  addPaymentMethod,
  cartReset,
} = cartSlice.actions

export default cartSlice.reducer
