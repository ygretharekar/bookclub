let initialState = {
	email: "",
	username: "",
	registerationError:"",
	loginError:"",
	token:"",
	isFetching: false,
	isAuthenticated: false
};

export default (state = initialState, action) => {
	switch (action.type) {
	case "LOGIN_REQUEST":
		return {
			...state,
			isFetching: true,
			isAuthenticated: false,
			...action.payload
		}; 

	case "LOGIN_SUCCESS":
		return {
			...state,
			isFetching: false,
			isAuthenticated: true,
			loginError: "",
			registrationError: "",
			...action.payload
		};	
	
	case "LOGIN_FAILURE":
		return {
			...state,
			isFetching: false,
			isAuthenticated: false,
			...action.payload
		};
	
	case "LOGOUT":
		return {
			...state,
			isFetching: false,
			isAuthenticated: false,
			email: "",
			username: "",
			token:""
		};
	
	case "NEW_SIGNUP":
		return {
			...state,
			isFetching: true,
			isAuthenticated: false
		};
	
	case "REGISTERATION_ERROR":
		return {
			...state,
			isFetching: false,
			isAuthenticated: false,
			...action.payload
		};

	default:
		return state;
	}
};