import React, { Component } from "react";
// import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import App from "../containers/App";

class Routes extends Component {
	render(){
		return(
			<div>
				<Router>
					<div>
						<Switch>
							<Route exact path="/" component={App} />
						</Switch>	
					</div>
				</Router>
			</div>
		);
	}
}

export default Routes;