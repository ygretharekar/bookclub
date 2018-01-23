import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import App from "../containers/App";
import HomePage from "../containers/homePage";
import LoginPage from "../containers/loginPage";
import SignupPage from "../containers/signupPage";
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
						</Switch>	
					</div>
				</Router>
			</div>
		);
	}
}

export default Routes;