import * as ActionTypes from '../constants/types';
import config from '../constants/config';

import { push } from 'react-router-redux';

const apiUrl = `${config.apiUrl}/auth`;

export function register(credentials) {
	return (dispatch) => {
		dispatch({ type: ActionTypes.REGISTER_REQUEST });
		fetch(`${apiUrl}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		.then(res => res.json())
		.then((data) => {
			if (data.success) {
				dispatch({
					type: ActionTypes.REGISTER_SUCCESS,
					payload: data.message
				});
				dispatch(push('/welcome'));
			} else {
				dispatch({
					type: ActionTypes.REGISTER_ERROR,
					payload: data.message
				});
			}
		})
		.catch(e => {
			dispatch({
				type: ActionTypes.REGISTER_ERROR,
				payload: e.message
			});
		});
	};
}

export function authenticate(credentials) {
	return (dispatch) => {
		dispatch({ type: ActionTypes.AUTHENTICATE_REQUEST });
		fetch(`${apiUrl}/authenticate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		.then(res => res.json())
		.then(data => {
			if(data.success) {
				let { token, user, message } = data;
				localStorage.setItem('token', token);
				dispatch({
					type: ActionTypes.AUTHENTICATE_SUCCESS,
					payload: { token, user, message }
				});
				dispatch(push('/chat'));
			} else {
				dispatch({
					type: ActionTypes.AUTHENTICATE_ERROR,
					payload: data.message
				});
			}
		})
		.catch(e => {
			dispatch({
				type: ActionTypes.AUTHENTICATE_ERROR,
				payload: e.message
			});
		});
	};
}

export function status() {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if(!token) {
			dispatch({ type: ActionTypes.STATUS_REJECT });
			return;
		}
		dispatch({ type: ActionTypes.STATUS_REQUEST });
		fetch(`${apiUrl}/status`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.success) {
				dispatch({
					type: ActionTypes.STATUS_SUCCESS,
					payload: data.user
				});
			} else {
				dispatch({ type: ActionTypes.STATUS_REJECT });
			}
		})
		.catch(e => {
			dispatch({ type: ActionTypes.STATUS_REJECT });
		});
	}
}

export function logout() {
	return (dispatch) => {
		localStorage.removeItem('token');
		dispatch({ type: ActionTypes.LOGOUT });
	};
}