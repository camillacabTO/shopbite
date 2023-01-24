import axios from 'axios';
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  logoutUserRequest,
} from '../reducers/userReducer.js';

import {
  signupUserRequest,
  signupUserSuccess,
  signupUserFail,
} from '../reducers/userReducer.js';

import {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userDetailsReset,
} from '../reducers/userReducer.js';

import {
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail,
  userUpdateReset,
} from '../reducers/userReducer.js';

export const signupUser = (email, password, name) => async (dispatch) => {
  try {
    dispatch(signupUserRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      // route to register new users
      { email, password, name },
      config
    );
    dispatch(signupUserSuccess(data));
    dispatch(loginUserSuccess(data));
    // login user after signup successful
    // saving in users browser
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      signupUserFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginUserRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch(loginUserSuccess(data));
    // saving in users browser
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      loginUserFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(logoutUserRequest());
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest());

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        // passing the token to the backend
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch(userDetailsSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === 'Not authorized') {
      dispatch(logoutUserRequest());
      // logout user if token is invalid
    }
    dispatch(userDetailsFail(message));
  }
};

export const updateUserProfile =
  (updatedUser) => async (dispatch, getState) => {
    try {
      dispatch(userUpdateRequest());

      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/profile`,
        updatedUser,
        config
      );

      dispatch(userUpdateSuccess(data));
      dispatch(loginUserSuccess(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized') {
        dispatch(logoutUserRequest());
      }
      dispatch(userUpdateFail(message));
    }
  };
