import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Snackbar from 'material-ui/Snackbar';

import * as appStateActions from '../actions/appState';

class Notification extends Component {
	constructor(props) {
		super(props);
		this.handleRequestClose = this.handleRequestClose.bind(this);
	}

	handleRequestClose() {
		this.props.appStateActions.closeNotification();
	}

	render() {
		const { open, text } = this.props;
		return (
			<Snackbar
				open={open}
				message={text}
				autoHideDuration={3000}
				onRequestClose={this.handleRequestClose}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		text: state.appState.notificatorText,
		open: state.appState.isNotificator
	}
}

function mapDispatchToProps(dispatch) {
	return {
		appStateActions: bindActionCreators(appStateActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);