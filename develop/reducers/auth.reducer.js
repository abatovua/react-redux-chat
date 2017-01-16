import * as ActionTypes from '../constants/types';

const initialState = {
	user: null,
	isLoggedIn: false,
	registerError: false,
	authError: false,
	authCheckFinished: false
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.REGISTER_REQUEST:
			return { ...state, registerError: false };

		case ActionTypes.REGISTER_SUCCESS:
			return { ...state };

		case ActionTypes.REGISTER_ERROR:
			return { ...state, registerError: true };

		case ActionTypes.AUTHENTICATE_REQUEST:
			return { ...state, authError: false };

		case ActionTypes.AUTHENTICATE_SUCCESS:
			return { ...state, isLoggedIn: true, user: action.payload.user };

		case ActionTypes.AUTHENTICATE_ERROR:
			return { ...state, authError: true };

		case ActionTypes.STATUS_REQUEST:
			return { ...state, user: null, isLoggedIn: false };

		case ActionTypes.STATUS_SUCCESS:
			return { ...state, user: action.payload, isLoggedIn: true, authCheckFinished: true };

		case ActionTypes.STATUS_REJECT:
			return { ...state, user: null, isLoggedIn: false, authCheckFinished: true };

		case ActionTypes.LOGOUT:
			return { ...state, user: null, isLoggedIn: false };

		default:
			return state;
	}
};