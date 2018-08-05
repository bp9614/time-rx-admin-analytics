import axios from 'axios';
import * as actionTypes from './action_types';
import * as consts from '../consts';
import { authorizationTokenCreator } from '../functions/index';

export function fetchJWT(username, password, callback) {
  const response = axios.post(consts.DJANGO_URL + 'api/token/',
      { username, password } , consts.AXIOS_HEADERS);

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then(({data}) => {
        sessionStorage.setItem('admin_analytics_access', data.access);
        sessionStorage.setItem('admin_analytics_refresh', data.refresh);

        dispatch({ type: actionTypes.FETCH_JWT_SUCCESS, payload: {
          ...data,
          username,
        }});

        callback();
      })
      .catch((error) => {
        dispatch({ type: actionTypes.FETCH_JWT_FAILURE });
      });
  };
}

export function logout() {
    sessionStorage.removeItem('admin_analytics_access');
    sessionStorage.removeItem('admin_analytics_refresh');

    return {
        type: actionTypes.LOGOUT,
    };
}

export function verifyFirst(access, refresh, funcAfter, ...funcArgs) {
  const response = axios.post(consts.DJANGO_URL + 'api/token/verify/', 
    { token: access }, consts.AXIOS_HEADERS);

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then((data) => {
        dispatch({ type: actionTypes.VERIFY_JWT_SUCCESS });
      })
      .catch(async (error) => {
        sessionStorage.removeItem('admin_analytics_access');
        await refreshJWT(dispatch, refresh);

        access = sessionStorage.getItem('admin_analytics_access');
        if (!access) {
          throw new Error('Unauthenticated');
        }
      })
      .then(() => {
        return axios.get(...funcAfter(access, ...funcArgs));
      })
      .then(({data}) => {
        dispatch({ type: actionTypes.GET_USERNAME, payload: data });
      });
  };
}

function refreshJWT(dispatch, refresh){
  const response = axios.post(consts.DJANGO_URL + 'api/token/refresh/', 
      { refresh }, consts.AXIOS_HEADERS);
  
  return response
    .then(({data}) => {
      sessionStorage.setItem('admin_analytics_access', data.access);
      dispatch({ type: actionTypes.REFRESH_JWT_SUCCESS, payload: data });
    })
    .catch((error) => {
      sessionStorage.removeItem('admin_analytics_refresh');
      dispatch({type: actionTypes.REFRESH_JWT_FAILURE});
    })
    .finally(() => {});
}

export function getUsername(access) {
  return [consts.DJANGO_URL + 'api/username', {
    headers: authorizationTokenCreator(access)
  }];
}