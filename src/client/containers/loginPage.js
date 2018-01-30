import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { newLogin } from "../actionPath";
import LoginPageComp from "../components/loginPageComp";

//https://trello.com/c/Qn8Myzan

export class LoginPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: ""
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.getEmail = this.getEmail.bind(this);
		this.getPassword = this.getPassword.bind(this);
	}

	handleLogin(){
		this.props.newLogin(this.state);
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
				{
					this.props.isAuthenticated ?
						<Redirect to="/allbooks" />
						:
						<LoginPageComp 
							email={this.getEmail}
							password={this.getPassword}
							login={this.handleLogin}
						/>
						
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		isAuthenticated: state.authReducer.isAuthenticated
	}
);

const mapDispatchToProps = {
	newLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);