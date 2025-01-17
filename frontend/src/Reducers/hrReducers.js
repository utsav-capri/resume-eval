import {
  HR_LOGIN_REQUEST,
  HR_LOGIN_SUCCESS,
  HR_LOGIN_FAIL,
  HR_LOGOUT,
  CREATE_HR_REQUEST,
  CREATE_HR_SUCCESS,
  CREATE_HR_FAIL
} from "../Constants/hrConstants";

// reducer to authenticate a hr
export const hrLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case HR_LOGIN_REQUEST:
			return { loading: true };
		case HR_LOGIN_SUCCESS:
			return { loading: false, success: true };
		case HR_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case HR_LOGOUT:
			return {};
		default:
			return state;
	}
};

// reducer to create a new user
export const createHrReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_HR_REQUEST:
			return { loading: true };
		case CREATE_HR_SUCCESS:
			return { loading: false, success: true };
		case CREATE_HR_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};