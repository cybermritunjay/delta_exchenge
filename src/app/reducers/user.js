import * as actionTypes from '../actionTypes';
import { useSelector } from 'react-redux';
const previousState = {}
const reducer = (state = previousState, action) => {
	switch (action.type) {
		case actionTypes.GETALL:
			return {
					members:action.items
			};
		default:
			return state;
	}
};

export default reducer