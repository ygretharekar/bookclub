import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./containers/createReactApp/index.css";
import Routes from "./routes/routes";
import configureStore from "./store/store";
import registerServiceWorker from "./registerServiceWorker";

let store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById("root")
);

registerServiceWorker();