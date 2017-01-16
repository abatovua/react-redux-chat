import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Logout extends Component {
	constructor(props) {
		super(props);
		this.logout = this.props.logout.bind(this);
	}

	render() {
		const style = {
			logOutButton: {
				color: '#ffffff'
			},
			paper: {
				padding: 20,
				zIndex: 2,
				width: '100%',
				position: 'relative'
			},
			wrapper: {
				position: 'absolute',
				right: 15,
				maxWidth: 300,
				width: 300,
				textAlign: 'center'
			}
		};

		const content = (
			<div style={style.wrapper}>
				<Paper zDepth={1} style={style.paper}>
					<p>Logged in as: <b>{this.props.user.username}</b></p>
					<RaisedButton label="Logout" primary={true} onClick={this.logout} />
				</Paper>
				<div className="disable-layer" onClick={this.props.toggle}></div>
			</div>
		);

		return (
			<div>
				<FlatButton label="Logout" style={style.logOutButton} onClick={this.props.toggle}/>
				{ this.props.open ? content : null }
			</div>
		);
	}
}

export default Logout;