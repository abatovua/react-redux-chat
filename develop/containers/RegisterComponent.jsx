import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../actions/auth';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class RegisterComponent extends Component {
	constructor() {
		super();

		this.state = {
			credentials: {
				username: '',
				password: ''
			}
		};

		this.usernameChange = this.usernameChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.registerError) {
			this.setState({
				credentials: {
					username: '',
					password: ''
				}
			});
		}
	}

	usernameChange(e, newValue) {
		this.setState({
			credentials: {
				...this.state.credentials,
				username: newValue
			}
		});
	}

	passwordChange(e, newValue) {
		this.setState({
			credentials: {
				...this.state.credentials,
				password: newValue
			}
		});
	}

	submit(e) {
		e.preventDefault();
		this.props.authActions.register(this.state.credentials);
	}

	render() {
		const style = {
			paper: {
				display: 'flex',
				maxWidth: 300,
				margin: '20px auto 0 auto',
				padding: 20,
				textAlign: 'center'
			},
			button: {
				marginTop: 20
			}
		};

		let button = this.props.loading ? <CircularProgress style={style.button} />
			: <RaisedButton label="Register" primary={true} style={style.button} type="submit" />;

		return (
			<main>
				<Paper zDepth={1} style={style.paper}>
					<form onSubmit={this.submit}>
						<h4>Enter your credentials</h4>
						<TextField
							type="text"
							hintText="Username"
							floatingLabelText="Username"
							onChange={this.usernameChange}
							value={this.state.credentials.username}
						/>
						<TextField
							type="password"
							hintText="Password"
							floatingLabelText="Password"
							onChange={this.passwordChange}
							value={this.state.credentials.password}
						/>
						{ button }
					</form>
				</Paper>
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {
		loading: state.appState.loading,
		registerError: state.auth.registerError
	}
}

function mapDispatchToProps(dispatch) {
	return {
		authActions: bindActionCreators(authActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);