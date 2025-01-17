import {
  HR_LOGIN_REQUEST,
  HR_LOGIN_SUCCESS,
  HR_LOGIN_FAIL,
  HR_LOGOUT,
  CREATE_HR_REQUEST,
  CREATE_HR_SUCCESS,
  CREATE_HR_FAIL,
} from "../Constants/hrConstants";
import axios from "axios";

export const loginAction = (username, password, email, name, organisation) => async (dispatch) => {
  try {
    dispatch({
      type: HR_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // send the HRname and password for authentication
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/login/",
      { username, password, email, name, organisation },
      config
    );

    // if success then dispatch login successe
    dispatch({
      type: HR_LOGIN_SUCCESS,
    });

    // redirect to the home page
    window.location.href = "/jobs";

    // store the HRInfo in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // in case of error return the error message
    dispatch({
      type: HR_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// action to deal with user logout
export const logoutAction = () => async (dispatch) => {
	// remove user info from local sorage
	localStorage.removeItem('userInfo');
	dispatch({
		type: HR_LOGOUT
	});
	// redirect to the home page
	window.location.href = '/';
};

export const createHrAction = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_HR_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // make a post request with the HR data
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/create",
      userData,
      config
    );
    dispatch({
      type: CREATE_HR_SUCCESS,
    });

    // in case of success redirect the user to home page
    window.location.href = "/";

    // set the user data in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // in case of error return the error message
    dispatch({
      type: CREATE_HR_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};