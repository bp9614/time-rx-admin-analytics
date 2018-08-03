import { LOGIN_ERROR_MESSAGE } from '../consts/index';
import * as actionTypes from '../actions/action_types';

export default function(state={showModal: false}, action) {
  switch (action.type) {
    case actionTypes.FETCH_JWT_FAILURE:
      state = {
        ...state,
        msg: LOGIN_ERROR_MESSAGE,
      }
    case actionTypes.SHOW_MODAL:
      state = {
        ...state,
        showModal: true
      };
      break;
    case actionTypes.CLOSE_MODAL:
      state = {
        ...state,
        showModal: false
      };
      break;
    default:
  }

  return state;
}