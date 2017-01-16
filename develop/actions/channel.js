import * as ActionTypes from '../constants/types';
import config from '../constants/config';

const apiUrl = `${config.apiUrl}/channels`;

export function loadChannels() {
	return (dispatch) => {
		dispatch({ type: ActionTypes.LOAD_CHANNELS_REQUEST });
		fetch(`${apiUrl}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			dispatch({ type: ActionTypes.LOAD_CHANNELS_SUCCESS, payload: data.channels });
		})
		.catch(e => {
			dispatch({ type: ActionTypes.LOAD_CHANNELS_ERROR })
		});
	}
}

export function createChannel(channel) {
	return (dispatch) => {
		dispatch({ type: ActionTypes.CREATE_CHANNEL_REQUEST });
		fetch(`${apiUrl}/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(channel)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
		});
	}
}

export function channelCreated(channel) {
	return {
		type: ActionTypes.CHANNEL_CREATED,
		payload: channel
	}
}

export function changeChannel(channel) {
	return {
		type: ActionTypes.CHANGE_CHANNEL,
		payload: channel.name
	};
}