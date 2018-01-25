const initialState = {
	loading: false,
	books:[]
};


export default (state = initialState, action) => {
	switch (action.type) {
	
	case "LOADING":
		return { 
			...state,
			loading: true 
		};

	case "FOUND":
		return {
			...state,
			loading: false
		};

	default:
		return state;
	}
};
