import React, { PropTypes } from 'react';

import Header from './Header';
import Notification from './Notification';

const App = (props) => (
  <div id="app-view">
		<Header/>
		{props.children}
		<Notification />
  </div>
);

App.propTypes = {
	children: PropTypes.element,
};

export default App;
