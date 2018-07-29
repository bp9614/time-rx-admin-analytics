import _ from 'lodash';

import * as actionTypes from '../actions/action_types';

export default function (state = {authenticated: false}, action) {
  switch (action.type) {
    case actionTypes.AUTHENTICATED:
      state = {
        ...state,
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
      state = {
        ...state, 
        authenticated: false
      };
      break;
    case actionTypes.LOGOUT:
      state = _.omit({ ...state, authenticated: true },
        ['access', 'refresh']);
      break;
    default:
      break;
  }

  return state;
}