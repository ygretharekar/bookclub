import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import App from "../containers/App";
import HomePage from "../containers/homePage";
import LoginPage from "../containers/loginPage";
import SignupPage from "../containers/signupPage";
import AllBooksPage from "../containers/all-books-page";
import ProfilePage from "../containers/profilePage";

import "../styles/Semantic-UI-CSS-master/semantic.min.css";
import "../styles/main.css";

class Routes extends Component {
	render(){
		return(
			<div>
				<Router>
					<div>
						<Switch>
							<Route exact path="/App" component={App} />
							<Route exact path="/" component={HomePage} />
							<Route exact path="/login" component={LoginPage} />
							<Route exact path="/signup" component={SignupPage} />
							<Route exact path="/allbooks" component={AllBooksPage} />
							<Route exact path="/profile" component={ProfilePage} />
						</Switch>	
					</div>
				</Router>
			</div>
		);
	}
}

export default Routes;