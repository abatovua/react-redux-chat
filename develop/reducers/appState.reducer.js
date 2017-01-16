import * as ActionTypes from '../constants/types';

const initialState = {
	authDropdownOpened: false,
	drawerOpened: false,
	loading: false,
	isNotificator: false,
	notificatorText: '',
	statusCheckLoading: false
};

export default function appStateReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.TOGGLE_AUTH_DROPDOWN:
			return { ...state, authDropdownOpened: !state.authDropdownOpened };

		case ActionTypes.REGISTER_REQUEST:
			return { ...state, loading: true };

		case ActionTypes.REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				isNotificator: true,
				notificatorText: action.payload
			};

		case ActionTypes.REGISTER_ERROR:
			return { ...state, loading: false, isNotificator: true, notificatorText: action.payload };

		case ActionTypes.CLOSE_NOTIFICATION:
			return { ...state, isNotificator: false };

		case ActionTypes.AUTHENTICATE_REQUEST:
			return { ...state, loading: true };

		case ActionTypes.AUTHENTICATE_SUCCESS:
			return {
				...state,
				loading: false,
				isNotificator: true,
				notificatorText: action.payload.message,
				authDropdownOpened: false
			};

		case ActionTypes.AUTHENTICATE_ERROR:
			return { ...state, loading: false, isNotificator: true, notificatorText: action.payload };

		case ActionTypes.STATUS_REQUEST:
			return { ...state, statusCheckLoading: true };

		case ActionTypes.STATUS_SUCCESS:
		case ActionTypes.STATUS_REJECT:
			return { ...state, statusCheckLoading: false };

		case ActionTypes.LOGOUT:
			return { ...state, authDropdownOpened: false };

		case ActionTypes.TOGGLE_DRAWER:
			return { ...state, drawerOpened: !state.drawerOpened };

		default:
			return state;
	}
};