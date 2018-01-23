import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import SignupPageComp from "../components/signupPageComp";

export class SignupPage extends Component {
	static propTypes = {
	}

	render() {
		return (
			<div>
				<SignupPageComp />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
