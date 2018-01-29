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

	case "ADD_BOOK":
		return {
			...state,
			books: [
				...new Set(
					[
						...state.books,
						...action.payload
					]
				)
			]
		};
	
	case "INIT_BOOKS":
		return {
			...state,
			books: action.payload
		};
		
	default:
		return state;
	}
};
