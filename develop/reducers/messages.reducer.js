import * as ActionTypes from '../constants/types';

const initialState = {
	list: []
};

export default function messagesReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.LOAD_MESSAGES_SUCCESS:
			return { ...state, list: [ ...action.payload ] };

		case ActionTypes.NEW_MESSAGE:
			return { ...state, list: [ ...state.list, action.payload ] };

		default:
			return state;
	}
};