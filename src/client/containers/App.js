import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

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
						To get started, edit <code>src/client/App.js</code> and saved to reloaded.
					</p>
				</main>
			</div>
		);
	}
}

export default App;