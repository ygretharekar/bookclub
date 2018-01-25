import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actionPath/index";
import SignupPageComp from "../components/signupPageComp";

export class SignupPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			username: "",
			email: "",
			password: ""
		};
		this.handleRegister = this.handleRegister.bind(this);
		this.getUsername = this.getUsername.bind(this);
		this.getEmail = this.getEmail.bind(this);
		this.getPassword = this.getPassword.bind(this);
	}

	handleRegister(){
		this.props.registerUser(this.state);
	}

	getUsername(e){
		this.setState(
			{
				username: e.target.value
			}
		);
	}

	getEmail(e){
		this.setState(
			{
				email: e.target.value
			}
		);
	}

	getPassword(e){
		this.setState(
			{
				password: e.target.value
			}
		);
	}

	render() {
		return (
			<div>
				<SignupPageComp
					email={this.getEmail}
					username={this.getUsername}
					password={this.getPassword}
					register={this.handleRegister} 
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user
});

const mapDispatchToProps = {
	registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);