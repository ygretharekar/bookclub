import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/combine";

console.log("PRODD");

export default initialState => createStore(
	reducers,
	initialState,
	compose(applyMiddleware(thunk))
);