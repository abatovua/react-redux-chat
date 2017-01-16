import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class Login extends Component {
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
		if(nextProps.authError) {
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
		this.props.handleAuth(this.state.credentials);
	}

	render() {
		const style = {
			signInButton: {
				color: '#ffffff'
			},
			loginButton: {
				marginTop: 20
			},
			paper: {
				padding: 20,
				width: '100%',
				zIndex: 2,
				position: 'relative'
			},
			wrapper: {
				position: 'absolute',
				right: 15,
				maxWidth: 300,
				textAlign: 'center'
			}
		};

		const form = (
			<div style={style.wrapper}>
				<Paper zDepth={1} style={style.paper}>
					<form onSubmit={this.submit}>
						<h4>Enter your credentials</h4>
						<TextField
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
						<RaisedButton label="Login" primary={true} style={style.loginButton} type="submit" />
					</form>
					<p>Have no account yet? <Link to="/register">Register</Link></p>
				</Paper>
				<div className="disable-layer" onClick={this.props.toggle}></div>
			</div>
		);

		return (
			<div>
				<FlatButton label="Sign In" style={style.signInButton} onClick={this.props.toggle}/>
				{ this.props.open ? form : null }
			</div>
		);
	}
}

export default Login;
