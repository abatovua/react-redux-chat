import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { toggleAuthDropdown, toggleDrawer } from '../actions/appState';
import { loadChannels, channelCreated, createChannel, changeChannel } from '../actions/channel';
import { loadMessages, sendMessage, newMessage } from '../actions/messages';

import CircularProgress from 'material-ui/CircularProgress';

export default function(ChatComponent) {
	class RequireAuth extends Component {

		componentWillReceiveProps(nextProps) {
			if (nextProps.authCheckFinished && !nextProps.isLoggedIn) {
				this.props.toggleAuthDropdown();
				this.props.push('/welcome');
			}
		}

		render() {
			return (this.props.authCheckFinished && this.props.isLoggedIn) ?
				<ChatComponent
					user={this.props.user}
					drawerOpened={this.props.drawerOpened}
					toggleDrawer={this.props.toggleDrawer}
					createChannel={this.props.createChannel}
					channelCreated={this.props.channelCreated}
					channels={this.props.channels}
					messages={this.props.messages}
					loadChannels={this.props.loadChannels}
					activeChannel={this.props.activeChannel}
					sendMessage={this.props.sendMessage}
					newMessage={this.props.newMessage}
					loadMessages={this.props.loadMessages}
					changeChannel={this.props.changeChannel}
				/>
				: <CircularProgress />;
		}
	}

	function mapStateToProps(state) {
		return {
			isLoggedIn: state.auth.isLoggedIn,
			authCheckFinished: state.auth.authCheckFinished,
			user: state.auth.user,
			drawerOpened: state.appState.drawerOpened,
			channels: state.channels.list,
			messages: state.messages.list,
			activeChannel: state.channels.activeChannel
		}
	}

	function mapDispatchToProps(dispatch) {
		return {
			toggleAuthDropdown: bindActionCreators(toggleAuthDropdown, dispatch),
			toggleDrawer: bindActionCreators(toggleDrawer, dispatch),
			push: bindActionCreators(push, dispatch),
			channelCreated: bindActionCreators(channelCreated, dispatch),
			createChannel: bindActionCreators(createChannel, dispatch),
			loadChannels: bindActionCreators(loadChannels, dispatch),
			changeChannel: bindActionCreators(changeChannel, dispatch),
			sendMessage: bindActionCreators(sendMessage, dispatch),
			newMessage: bindActionCreators(newMessage, dispatch),
			loadMessages: bindActionCreators(loadMessages, dispatch)
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);

}