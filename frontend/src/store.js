import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  productListReducer,
  productDetailsReducer
} from './reducers/productReducer'

const middleware = [thunk]
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer
})
const initialState = {}
// loads when Redux is initialized

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
  //replaces regular compose with standard installation
)

export default store
