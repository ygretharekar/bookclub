import axios from "axios";
let HOST = "http://127.0.0.1:8100";



////////////////////////////LOGIN//////////////////////////////

export const LOGIN_REQUEST = "LOGIN_REQUEST";

export const requestLogin = payload => ({
	type: LOGIN_REQUEST,
	payload
});

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const receiveLogin = payload => ({
	type: LOGIN_SUCCESS,
	payload
});

export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginError = payload => ({
	type: LOGIN_FAILURE,
	payload
});

/////////////////////////SIGNUP/////////////////////////////

export const NEW_SIGNUP = "NEW_SIGNUP";

export const newSignup = payload => ({
	type: NEW_SIGNUP,
	payload
});


export const REGISTERATION_ERROR = "REGISTERATION_ERROR";

export const registerationError = payload => ({
	type: REGISTERATION_ERROR,
	payload
});

//async

export const registerUser = 
	user => 
		dispatch => {
			dispatch(newSignup(user));
			axios
				.post(`${HOST}/register`, user)
				.then(
					res => {
						let u = {
							username: res.data.username,
							email: res.data.email,
							token: res.data.token
						};
						dispatch(receiveLogin(u));
					}
				)
				.catch(
					err => {
						console.error("registeration Error", err.response.data);
						dispatch(registerationError(err.response.data));
					}
				);
		};

////////////////////////////////////////////////////////////////