import axios from 'axios'
import {
  addItemToCart,
  removeItemFromCart,
  addShippingAddress,
  addPaymentMethod,
} from '../reducers/cartReducer'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}/`)
  dispatch(
    addItemToCart({
      product: data._id,
      price: data.price,
      image: data.image,
      name: data.name,
      stock: data.numInStock,
      quantity,
    })
  )
  //save current cart to local storage
  localStorage.setItem(
    'itemsInCart',
    JSON.stringify(getState().cart.itemsInCart)
  )
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeItemFromCart(id))
  // update cart in localStorage
  localStorage.setItem(
    'itemsInCart',
    JSON.stringify(getState().cart.itemsInCart)
  )
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(addShippingAddress(data))
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(addPaymentMethod(data))
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
