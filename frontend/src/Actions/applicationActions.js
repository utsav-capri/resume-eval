import axios from "axios";

import {
  APPLICATIONS_LIST_REQUEST,
  APPLICATIONS_LIST_FAIL,
  APPLICATIONS_LIST_SUCCESS,
  APPLICATIONS_CREATE_SUCCESS,
  APPLICATIONS_CREATE_FAIL,
  APPLICATIONS_CREATE_REQUEST,
  APPLICATIONS_DETAIL_REQUEST,
  APPLICATIONS_DETAIL_FAIL,
  APPLICATIONS_DETAIL_SUCCESS
} from "../Constants/applicationConstants";

// action to list all the applications for the hr
export const listApplications = (pk) => async (dispatch) => {
  try {
    dispatch({ type: APPLICATIONS_LIST_REQUEST });

    // get userInfo from local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let dataFinal = null;

    // if user info exist then make a get request with auth token
    if (userInfo) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/jobs/${pk}`,
        config
      );
      dataFinal = data;
    } else {
      // redirect to login page
      window.location.href = "/login";
    }
    dispatch({
      type: APPLICATIONS_LIST_SUCCESS,
      payload: dataFinal,
    });
  } catch (error) {
    dispatch({
      // in case of error return error message
      type: APPLICATIONS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// action to create a application for the hr
export const createApplications = (input_data,job_id) => async (dispatch) => {
  try {
    dispatch({ type: APPLICATIONS_CREATE_REQUEST });

    // get userInfo from local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // if user info exist then make a get request with auth token
    if (userInfo) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log(input_data, job_id)
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/applications/create/${job_id}`,
        input_data,
        config
      );
      dispatch({
        type: APPLICATIONS_CREATE_SUCCESS,
        payload: data,
      });
      window.location.reload(true)
    } else {
      // redirect to login page
      window.location.href = "/login";
    }
  } catch (error) {
    dispatch({
      // in case of error return error message
      type: APPLICATIONS_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const detailApplication = (id) => async (dispatch) => {
  try {
    dispatch({ type: APPLICATIONS_DETAIL_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // if user info exist then make a get request with auth token
    if (userInfo) {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/applications/${id}`,
        config
      );
      dispatch({
        type: APPLICATIONS_DETAIL_SUCCESS,
        payload: data,
      });
    } 
  } catch (error) {
    window.location.href = "/login"
  }
};