import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import jwtReducer from './jwt_reducer';
import loadingReducer from './loading_reducer';
import modalReducer from './modal_reducer';
import queryReducer from './query_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  jwt: jwtReducer,
  loading: loadingReducer,
  modal: modalReducer,
  query: queryReducer,
});

export default rootReducer;