import * as ActionTypes from '../constants/types';
import config from '../constants/config';

const apiUrl = `${config.apiUrl}/messages`

export function sendMessage(messageData) {
	return (dispatch) => {
		fetch(`${apiUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(messageData)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
		})
		.catch(e => {
			console.log(e.message);
		});
	}
}

export function loadMessages(channel) {
	return (dispatch) => {
		fetch(`${apiUrl}/${channel}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => {
				if(data.success) {
					dispatch({
						type: ActionTypes.LOAD_MESSAGES_SUCCESS,
						payload: data.messages
					});
				}
			})
			.catch(e => {
				console.log(e.message);
			});
	}
}


export function newMessage(message) {
	return {
		type: ActionTypes.NEW_MESSAGE,
		payload: message
	}
}