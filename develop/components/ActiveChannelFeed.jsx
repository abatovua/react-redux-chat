import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';

class ActiveChannelFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.message = this.message.bind(this);
	}

	componentDidUpdate() {
		window.scrollTo(0,document.body.scrollHeight);
	}

	handleChange(e, newValue) {
		this.setState({
			message: newValue
		})
	}

	message(e) {
		e.preventDefault();
		this.props.sendNewMessage(this.state.message);
		this.setState({
			message: ''
		});
	}

	render() {
		const style = {
			wrapper: {
				margin: '0 auto 72px 270px',
				maxWidth: 1024,
				minHeight: '100%',
				backgroundColor: '#ffffff'
			},
			form: {
				position: 'fixed',
				bottom: 0,
				width: '100%',
				maxWidth: 1024,
				backgroundColor: '#a0b2bc'
			},
			messageField: {
				width: '100%'
			}
		};

		let messages = this.props.messages.map((message, i) => {
			return <div key={message._id} style={{borderBottom: '1px solid #a0b2bc'}}>
				<h4>{message.author.username}</h4>
				<p>{message.text}</p>
			</div>
		})

		return (
			<main style={style.wrapper}>
				{ messages }
				<form style={style.form} onSubmit={this.message}>
					<TextField
						style={style.messageField}
						type="text"
						hintText="Type message"
						floatingLabelText="Type message"
						onChange={this.handleChange}
						value={this.state.message}
					/>
					<button type="submit" hidden></button>
				</form>
			</main>
		);
	}
}

export default ActiveChannelFeed;