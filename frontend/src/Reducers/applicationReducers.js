import {
  APPLICATIONS_LIST_REQUEST,
  APPLICATIONS_LIST_FAIL,
  APPLICATIONS_LIST_SUCCESS,
  APPLICATIONS_CREATE_REQUEST,
  APPLICATIONS_CREATE_SUCCESS,
  APPLICATIONS_CREATE_FAIL,
  APPLICATIONS_DETAIL_REQUEST,
  APPLICATIONS_DETAIL_FAIL,
  APPLICATIONS_DETAIL_SUCCESS,
} from "../Constants/applicationConstants";

// reducer to get the list of note related to a user
export const applicationsListReducer = (
  state = { applications: { desc: "", applicants: [] } },
  action
) => {
  switch (action.type) {
    case APPLICATIONS_LIST_REQUEST:
      return { loading: true, applications: { desc: "", applicants: [] } };
    case APPLICATIONS_LIST_SUCCESS:
      return { loading: false, applications: action.payload };
    case APPLICATIONS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const applicationsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATIONS_CREATE_REQUEST:
      return { loading: true };
    case APPLICATIONS_CREATE_SUCCESS:
      return {
        loading: false,
        createdProduct: action.payload,
        success: true,
      };
    case APPLICATIONS_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const applicationsDetailReducer = (
  state = {
    analytics: { ratings: { candidate_rating: {}, project_rating: {} } },
  },
  action
) => {
  switch (action.type) {
    case APPLICATIONS_DETAIL_REQUEST:
      return {
        loading: true,
        applicationDetail: {
          analytics: {
            ratings: { candidate_rating: {}, project_rating: {} }
          },
        },
      };
    case APPLICATIONS_DETAIL_SUCCESS:
      return { loading: false, applicationDetail: action.payload };
    case APPLICATIONS_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
