import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { AUTHENTICATED } from './actions/action_types';
import AnalyticsPage from './components/analytics_page';
import LoginPage from './components/login_page';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import RequireAuth from './components/require_auth';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const accessToken = sessionStorage.getItem('admin_analytics_access');
const refreshToken = sessionStorage.getItem('admin_analytics_refresh');
if (accessToken && refreshToken) {
  store.dispatch({type: AUTHENTICATED, payload: {
    'access': accessToken,
    'refresh': refreshToken
  }});
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/analytics" component={RequireAuth(AnalyticsPage)} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();