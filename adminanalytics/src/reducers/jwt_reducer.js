import _ from 'lodash';
import * as actionTypes from '../actions/action_types';

export default function (state = {authenticated: false}, action) {
  switch (action.type) {
    case actionTypes.AUTHENTICATED:
      state = {
        ...state,
        ...action.payload,
        authenticated: true,
      }
      break;
    case actionTypes.FETCH_JWT_SUCCESS:
      state = {
        ...state, 
        ...action.payload.data, 
        authenticated: true
      };
      break;
    case actionTypes.VERIFY_JWT_SUCCESS:
      state = {
        ...state, 
        ...action.payload.data, 
        authenticated: true
      };
      break;
    case actionTypes.VERIFY_JWT_FAILURE:
    case actionTypes.LOGOUT:
      state = _.omit({ ...state, authenticated: false },
        ['access', 'refresh']);
      break;
    default:
  }

  return state;
}