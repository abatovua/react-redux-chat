import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import CloseMenuIcon from 'material-ui/svg-icons/navigation/close';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import ActiveChannelFeed from './ActiveChannelFeed';

class ChatComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createChannel: false,
			newChannelName: ''
		};

		this.toggleCreateChannel = this.toggleCreateChannel.bind(this);
		this.handleNewChannelChange = this.handleNewChannelChange.bind(this);
		this.create = this.create.bind(this);
		this.sendNewMessage = this.sendNewMessage.bind(this);
		this.change - this.change.bind(this);
	}

	componentDidMount() {
		//load all channels
		this.props.loadChannels();
		//connecting to socket server
		this.socket = io.connect('http://localhost:8000');
		//connecting to Main room by default
		this.socket.emit('join channel', { name: this.props.activeChannel });
		this.props.loadMessages(this.props.activeChannel);

		this.socket.on('new channel', (channel) => {
			this.props.channelCreated(channel);
		});

		this.socket.on('new message', (message) => {
			this.props.newMessage(message);
		});
	}

	componentDidUpdate() {
		const { newChannel } = this.refs;
		if(newChannel) {
			newChannel.input.focus();
		}
	}

	change(channel) {
		if(channel.name !== this.props.activeChannel) {
			this.socket.emit('leave channel', { name: this.props.activeChannel });
			this.socket.emit('join channel', { name: channel.name });
			this.props.changeChannel(channel);
			this.props.loadMessages(channel.name);
		}
	}

	toggleCreateChannel() {
		this.setState({
			createChannel: !this.state.createChannel,
			newChannelName: ''
		});
	}

	handleNewChannelChange(e, newValue) {
		this.setState({
			newChannelName: newValue
		})
	}

	sendNewMessage(text) {
		this.props.sendMessage({
			text,
			author: {
				username: this.props.user.username,
				id: this.props.user.id
			},
			channel: this.props.activeChannel
		});
	}

	create(e) {
		e.preventDefault();

		this.props.createChannel({
			name: this.state.newChannelName,
			owner: this.props.user
		});

		this.toggleCreateChannel();
	}

	render() {
		const style = {
			createChannel: {
				wrapper: {
					position: 'absolute',
					top: 64,
					backgroundColor: '#f7f7f7',
					width: '100%',
					padding: '0 10px',
					zIndex: 1
				},
				textField: {
					width: '100%'
				}
			},
			activeChannel: {
				backgroundColor: '#a0b2bc'
			}
		};

		let createChannel = (
			<Paper zDepth={1} style={style.createChannel.wrapper}>
				<form onSubmit={this.create}>
					<TextField
						name="channel"
						style={style.createChannel.textField}
						ref="newChannel"
						type="text"
						hintText="New channel"
						floatingLabelText="New channel"
						onChange={this.handleNewChannelChange}
					/>
					<button type="submit" hidden></button>
				</form>
			</Paper>
		);

		const channels = this.props.channels.map((channel, i) => {
			return (
				<MenuItem
					key={i}
					style={this.props.activeChannel === channel.name ? style.activeChannel : {}}
					onClick={() => this.change(channel)}
				>{channel.name}
				</MenuItem>
			);
		});

		return (
			<div>
				<Drawer open={this.props.drawerOpened}>
					<AppBar
						title="Channels"
						iconElementRight={
							<IconButton onClick={this.toggleCreateChannel}>
								{ this.state.createChannel ? <RemoveIcon /> : <AddIcon /> }
							</IconButton>
						}
						iconElementLeft={
							<IconButton onClick={this.props.toggleDrawer}>
								<CloseMenuIcon />
							</IconButton>
						}
					/>
					{ this.state.createChannel ? createChannel : null }
					{ channels }
				</Drawer>
				<ActiveChannelFeed
					sendNewMessage={this.sendNewMessage}
					messages={this.props.messages}
				/>
			</div>
		);
	}
}

export default ChatComponent;