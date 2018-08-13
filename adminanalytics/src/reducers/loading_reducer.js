import * as actionTypes from '../actions/action_types';

export default function(state={isLoading: false}, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      state = {...state, isLoading: true}
      break;
    case actionTypes.EMPTY_RESPONSE:
    case actionTypes.GET_USERNAME:
    case actionTypes.HAS_CHART:
    case actionTypes.HAS_HISTORY:
    case actionTypes.REFRESH_JWT_SUCCESS:
    case actionTypes.REFRESH_JWT_FAILURE:
    case actionTypes.FETCH_JWT_SUCCESS:
    case actionTypes.FETCH_JWT_FAILURE:
    case actionTypes.VERIFY_JWT_SUCCESS:
    case actionTypes.VERIFY_JWT_FAILURE:
      state = {...state, isLoading: false}
      break;
    default:
  }

  return state;
}