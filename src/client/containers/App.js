import React, { Component } from "react";
import { connect } from "react-redux";

import logo from "./createReactApp/logo.svg";
import "./createReactApp/App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<main>
					<h1>
						Create React App
					</h1>
					<p className="App-intro">
						To get started, edited <code>src/client/App.js</code> and save to reload.
					</p>
				</main>
			</div>
		);
	}
}

export default connect(null)(App);