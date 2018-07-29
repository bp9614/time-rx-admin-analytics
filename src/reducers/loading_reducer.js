import * as actionTypes from '../actions/action_types';

export default function(state={isLoading: false}, action) {
  switch(action.type) {
    case actionTypes.LOADING:
      state = {isLoading: true}
    case actionTypes.FETCH_JWT_SUCCESS:
    case actionTypes.FETCH_JWT_FAILURE:
    case actionTypes.VERIFY_JWT_SUCCESS:
    case actionTypes.VERIFY_JWT_FAILURE:
      state = {isLoading: false}
    default:
  }

  return state;
}