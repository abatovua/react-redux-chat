import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
import configureStore from './store/root.store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

import './scss/main.scss';

import App from './containers/App';
import WelcomeComponent from './components/WelcomeComponent';
import RegisterComponent from './containers/RegisterComponent';

import ChatContainer from './containers/ChatContainer';
import ChatComponent from './components/ChatComponent';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

const Chat = ChatContainer(ChatComponent);

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store}>
			<Router history={history}>
				<Route path="/" component={App}>
					<IndexRedirect to="/welcome" />
					<Route path="welcome" component={WelcomeComponent} />
					<Route path="register" component={RegisterComponent} />
					<Route path="chat" component={Chat} />
				</Route>
			</Router>
		</Provider>
	</MuiThemeProvider>,

	document.getElementById('react-view')
);

