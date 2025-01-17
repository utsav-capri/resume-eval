import {
  JOBS_LIST_REQUEST,
  JOBS_LIST_FAIL,
  JOBS_LIST_SUCCESS,
  JOBS_CREATE_REQUEST,
  JOBS_CREATE_SUCCESS,
  JOBS_CREATE_FAIL,
} from "../Constants/jobConstants";

// reducer to get the list of note related to a user
export const jobsListReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOBS_LIST_REQUEST:
      return { loading: true, jobs: [] };
    case JOBS_LIST_SUCCESS:
      return { loading: false, jobs: action.payload };
    case JOBS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const jobsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case JOBS_CREATE_REQUEST:
      return { loading: true };
    case JOBS_CREATE_SUCCESS:
      return {
        loading: false,
        createdProduct: action.payload,
        success: true,
      };
    case JOBS_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
