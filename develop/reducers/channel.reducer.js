import * as ActionTypes from '../constants/types';

const initialState = {
	list: [],
	activeChannel: 'Main',
	loading: false
};

export default function channelsReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.CHANNEL_CREATED:
			return { ...state, list: [ ...state.list, action.payload ] };

		case ActionTypes.CHANGE_CHANNEL:
			return { ...state, activeChannel: action.payload };

		case ActionTypes.LOAD_CHANNELS_REQUEST:
			return { ...state, loading: true };

		case ActionTypes.LOAD_CHANNELS_SUCCESS:
			return { ...state, loading: false, list: [ ...action.payload ] };

		case ActionTypes.LOAD_CHANNELS_ERROR:
			return { ...state, loading: false };

		default:
			return state;
	}
};