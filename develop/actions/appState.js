import * as ActionTypes from '../constants/types';

export function toggleAuthDropdown() {
	return {
		type: ActionTypes.TOGGLE_AUTH_DROPDOWN
	}
}

export function closeNotification() {
	return {
		type: ActionTypes.CLOSE_NOTIFICATION
	}
}

export function toggleDrawer() {
	return {
		type: ActionTypes.TOGGLE_DRAWER
	}
}