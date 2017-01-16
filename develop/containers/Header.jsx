import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleAuthDropdown, toggleDrawer } from '../actions/appState';
import { authenticate, logout, status } from '../actions/auth';
import { isChatUrlMatch } from '../selectors';

import CircularProgress from 'material-ui/CircularProgress';
import { lime500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import Login from '../components/Login';
import Logout from '../components/Logout';

class Header extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.status();
	}

	render() {
		const style = {
			wrapper: {
				position: 'fixed',
				width: '100%',
				top: 0
			},
			button: {
				color: '#ffffff'
			},
			rightIcon: {
				marginTop: 12
			}
		};

		const login = (
			<Login
				open={this.props.authDropdownOpened}
				toggle={this.props.toggleAuthDropdown}
				handleAuth={this.props.authenticate}
				authError={this.props.authError}
			/>
		);

		const logout = (
			<Logout
				open={this.props.authDropdownOpened}
				toggle={this.props.toggleAuthDropdown}
				user={this.props.user}
				logout={this.props.logout}
			/>
		);

		const spinner = <CircularProgress color={lime500} />;

		let content = this.props.isLoggedIn ? logout : login;

		return (
			<div style={style.wrapper}>
				<AppBar
					title="Title"
					iconStyleRight={style.rightIcon}
					showMenuIconButton={this.props.isChatUrlMatch}
					iconElementLeft={
						<IconButton onClick={this.props.toggleDrawer}>
							<MenuIcon />
						</IconButton>
					}
					iconElementRight={this.props.statusCheckLoading ? spinner : content}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		authError: state.auth.authError,
		user: state.auth.user,
		statusCheckLoading: state.appState.statusCheckLoading,
		authDropdownOpened: state.appState.authDropdownOpened,
		drawerOpened: state.appState.drawerOpened,
		isChatUrlMatch: isChatUrlMatch(state),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		authenticate: bindActionCreators(authenticate, dispatch),
		logout: bindActionCreators(logout, dispatch),
		status: bindActionCreators(status, dispatch),
		toggleDrawer: bindActionCreators(toggleDrawer, dispatch),
		toggleAuthDropdown: bindActionCreators(toggleAuthDropdown, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
