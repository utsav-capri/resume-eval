import axios from "axios";

import {
  JOBS_LIST_REQUEST,
  JOBS_LIST_FAIL,
  JOBS_LIST_SUCCESS,
  JOBS_CREATE_SUCCESS,
  JOBS_CREATE_FAIL,
  JOBS_CREATE_REQUEST,
} from "../Constants/jobConstants";

// action to list all the jobs for the hr
export const listJobs = () => async (dispatch) => {
  try {
    dispatch({ type: JOBS_LIST_REQUEST });

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
        "http://127.0.0.1:8000/api/jobs",
        config
      );
      dataFinal = data;
    } else {
      // redirect to login page
      window.location.href = "/login";
    }
    dispatch({
      type: JOBS_LIST_SUCCESS,
      payload: dataFinal,
    });
  } catch (error) {
    dispatch({
      // in case of error return error message
      type: JOBS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// action to create a job for the hr
export const createJobs = (input_data) => async (dispatch) => {
  try {
    dispatch({ type: JOBS_CREATE_REQUEST });

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
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/jobs/create",
        input_data,
        config
      );
      dispatch({
        type: JOBS_CREATE_SUCCESS,
        payload: data,
      });
      window.location.href  = `/jobs/${data.id}`
    } else {
      // redirect to login page
      window.location.href = "/login";
    }
  } catch (error) {
    dispatch({
      // in case of error return error message
      type: JOBS_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
