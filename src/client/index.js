import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./containers/index.css";
import App from "./containers/App";
import configureStore from "./store/store";
import registerServiceWorker from "./registerServiceWorker";

let store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

registerServiceWorker();