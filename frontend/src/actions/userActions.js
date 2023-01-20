import axios from 'axios';
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  logoutUser,
} from '../reducers/userReducer.js';

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

export const userLogout = async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(logoutUser());
};
