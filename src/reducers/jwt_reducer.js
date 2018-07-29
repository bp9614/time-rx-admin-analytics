import _ from 'lodash';

import * as actionTypes from '../actions/action_types';

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.FETCH_JWT_SUCCESS:
      state = { ...state, ...action.payload.data, is_available: true };
      break;
    case actionTypes.REFRESH_JWT_SUCCESS:
      state = { ...state, ...action.payload.data, is_available: true };
      break;
    case actionTypes.LOGOUT:
      state = _.omit({ ...state, is_available: true }, ['access', 'refresh']);
      break;
  }

  return state;
}