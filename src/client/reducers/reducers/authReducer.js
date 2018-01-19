let initialState = {
	email: "",
	registerationError:"",
	loginError:"",
	token:"",
	isFetching: false,
	isAuthenticated: false
};

export default (state = initialState, action) => {
	switch (action.type) {
	case "ACTION_TYPE":
		return; 
	default:
		return state;
	}
};