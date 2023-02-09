import { createSlice } from '@reduxjs/toolkit';

const createOrderInitialState = {
  order: {},
  loading: 'idle',
  error: null,
  success: false,
};
const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState: createOrderInitialState,
  reducers: {
    createOrderRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    createOrderSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.order = action.payload;
      state.error = null;
      state.success = true;
    },
    createOrderFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = action.payload;
    },
    createOrderReset(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = null;
      state.updated = false;
      state.order = {};
    },
  },
});

export const createOrderReducer = createOrderSlice.reducer;

export const { createOrderRequest, createOrderSuccess, createOrderFail } =
  createOrderSlice.actions;

// export const orderDetailsReducer = (
//   state = { loading: true, orderItems: [], shippingAddress: {} },
//   action
// ) => {
//   switch (action.type) {
//     case ORDER_DETAILS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case ORDER_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         order: action.payload,
//       };
//     case ORDER_DETAILS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const orderPayReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ORDER_PAY_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_PAY_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//       };
//     case ORDER_PAY_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case ORDER_PAY_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const orderDeliverReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ORDER_DELIVER_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_DELIVER_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//       };
//     case ORDER_DELIVER_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case ORDER_DELIVER_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const orderListMyReducer = (state = { orders: [] }, action) => {
//   switch (action.type) {
//     case ORDER_LIST_MY_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_LIST_MY_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//       };
//     case ORDER_LIST_MY_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case ORDER_LIST_MY_RESET:
//       return { orders: [] };
//     default:
//       return state;
//   }
// };

// export const orderListReducer = (state = { orders: [] }, action) => {
//   switch (action.type) {
//     case ORDER_LIST_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_LIST_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//       };
//     case ORDER_LIST_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
