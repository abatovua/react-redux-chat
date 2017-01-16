import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root.reducer';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState) {
	const logger = createLogger();
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			thunk,
			logger,
			routerMiddleware(browserHistory)
		));

	if (module.hot) {
		module.hot.accept('../reducers/root.reducer.js', () => {
			const nextRootReducer = require('../reducers/root.reducer.js')
			store.replaceReducer(nextRootReducer)
		});
	}

	return store;
}