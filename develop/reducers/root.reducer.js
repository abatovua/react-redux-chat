import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import auth  from './auth.reducer';
import appState from './appState.reducer';
import channels from './channel.reducer';
import messages from './messages.reducer';

const rootReducer = combineReducers({
	auth,
	appState,
	channels,
	messages,
	routing: routerReducer
});

export default rootReducer;
