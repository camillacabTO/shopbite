import { createSlice } from '@reduxjs/toolkit';

const userLoginInitialState = { user: null, loading: 'idle', error: null };
const userLoginSlice = createSlice({
  name: 'user',
  initialState: userLoginInitialState,
  reducers: {
    loginUserRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    loginUserSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user = action.payload;
      state.error = null;
    },
    loginUserFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = action.payload;
    },
    logoutUser(state) {
      state = {};
    },
  },
});

export const userLoginReducer = userLoginSlice.reducer;

export const { loginUserRequest, loginUserSuccess, loginUserFail, logoutUser } =
  userLoginSlice.actions;
