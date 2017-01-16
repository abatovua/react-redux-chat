import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const WelcomeComponent = (props) => {
	return <div style={{paddingTop: 64}}>{props.isLoggedIn ? <Link to="/chat">Join chat</Link> : <div>Sign in please</div>}</div>
};

function mapStateToProps(state) {
	return {
		isLoggedIn: state.auth.isLoggedIn
	}
}

export default connect(mapStateToProps)(WelcomeComponent);
