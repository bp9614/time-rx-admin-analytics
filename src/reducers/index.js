import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import jwtReducer from './jwt_reducer';

const rootReducer = combineReducers({
  jwt: jwtReducer,
  form: formReducer,
});

export default rootReducer;