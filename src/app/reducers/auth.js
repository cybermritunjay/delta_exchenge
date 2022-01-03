import * as actionTypes from '../actionTypes/index';

const initialState = {
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			console.log(action)
			return {
                    user:action.items
			};
		case actionTypes.LOGOUT:
			return {
			};
		default:
			return state;
	}
};

export default reducer