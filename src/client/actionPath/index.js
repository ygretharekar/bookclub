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


export const newLogin = 
	user =>
		dispatch => {
			dispatch(requestLogin(user));	
			axios
				.post(`${HOST}/login`, user)
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
						console.error("Login Error: ", err);
						dispatch(loginError(err.response.data));
					}
				);
		};


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
			console.log("new user ", user);
			dispatch(newSignup(user));
			return axios
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
						console.error("registeration Error: ", err.response.data);
						dispatch(registerationError(err.response.data));
					}
				);
		};

		
///////////////////////LOGOUT//////////////////////////////

export const LOGOUT = "LOGOUT";

export const logoutUser = () => ({
	type: LOGOUT
});
/////////////////////LOADING//////////////////////////////////

export const LOADING = "LOADING";

export const loading = () => ({
	type: LOADING
});

export const FOUND = "FOUND";


export const found = () => ({
	type: FOUND
});

/////////////////////////GET_BOOKS///////////////////////////////

export const INIT_BOOKS = "INIT_BOOKS";

export const initBooks = payload => ({
	type: INIT_BOOKS,
	payload
});

export const getBooks = 
	() =>
		dispatch => {
			axios
				.get("/api/getbooks")
				.then(
					res => {
						console.log("====================================");
						console.log(res.data);
						console.log("====================================");
						dispatch(initBooks(res.data));
						dispatch(found());
						

					}
				)
				.catch( err => console.error(err));
		};


//////////////////////ADD_BOOK////////////////////////////////

export const ADD_BOOK = "ADD_BOOK";


export const addBook = payload => ({
	type: ADD_BOOK,
	payload
});

export const searchBook = 
	book =>
		dispatch => {
			dispatch(loading());
			axios
				.post("/api/book/add", book)
				.then( 
					res => {
						console.log(res.data);
						dispatch(addBook(res.data));
						dispatch(found());
					
					}

				)
				.catch(
					err => console.error(err)
				);


		};