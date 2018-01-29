import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import bookReducer from "./reducers/bookReducer";

export default combineReducers(
	{
		authReducer,
		bookReducer
	}
);