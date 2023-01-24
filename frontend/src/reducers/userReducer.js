import { createSlice } from '@reduxjs/toolkit';

const userSignupInitialState = { user: null, loading: 'idle', error: null };
const userSignupSlice = createSlice({
  name: 'userSignup',
  initialState: userSignupInitialState,
  reducers: {
    signupUserRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    signupUserSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user = action.payload;
      state.error = null;
    },
    signupUserFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = action.payload;
    },
  },
});

export const userSignupReducer = userSignupSlice.reducer;

export const { signupUserRequest, signupUserSuccess, signupUserFail } =
  userSignupSlice.actions;

const userLoginInitialState = { user: null, loading: 'idle', error: null };
const userLoginSlice = createSlice({
  name: 'userLogin',
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
    logoutUserRequest(state) {
      state.user = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
});

export const userLoginReducer = userLoginSlice.reducer;

export const {
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  logoutUserRequest,
} = userLoginSlice.actions;

const userDetailsInitialState = { user: {}, loading: 'idle', error: null };
const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: userDetailsInitialState,
  reducers: {
    userDetailsRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    userDetailsSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user = action.payload;
      state.error = null;
    },
    userDetailsFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = action.payload;
    },
    userDetailsReset(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = null;
      state.user = {};
    },
  },
});

export const userDetailsReducer = userDetailsSlice.reducer;

export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userDetailsReset,
} = userDetailsSlice.actions;

// used to update user profile
const userUpdateInitialState = {
  user: {},
  loading: 'idle',
  error: null,
  updated: false,
};
const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState: userUpdateInitialState,
  reducers: {
    userUpdateRequest(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    userUpdateSuccess(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user = action.payload;
      state.updated = true;
      state.error = null;
    },
    userUpdateFail(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = action.payload;
    },
    userUpdateReset(state) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.error = null;
      state.updated = false;
      state.user = {};
    },
  },
});

export const userUpdateReducer = userUpdateSlice.reducer;

export const {
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
  userUpdateReset,
} = userUpdateSlice.actions;
