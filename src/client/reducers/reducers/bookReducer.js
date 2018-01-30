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
	
	case "ADD_REQUEST":
		return {
			...state,
			loading: false,
			books: state.books.map(
				book => book.title === action.payload.title ?
					{
						...book,
						requests: [
							...book.requests,
							action.payload.user
						]
					}
					:
					book
			)
		};
	
	

	default:
		return state;
	}
};
