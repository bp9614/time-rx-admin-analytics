import axios from 'axios';

import * as consts from '../consts';
import * as actionTypes from './action_types';

export function fetchJWT(username, password, callback) {
  const response = axios.post(consts.DJANGO_URL + 'api/token/',
      { username, password } , consts.AXIOS_HEADERS);

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then(({data}) => {
        sessionStorage.setItem('admin_analytics_access', data.access);
        sessionStorage.setItem('admin_analytics_refresh', data.refresh);

        dispatch({ type: actionTypes.FETCH_JWT_SUCCESS, payload: data });

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

function refreshJWT(refreshToken){
  const response = axios.post(consts.DJANGO_URL + 'api/token/refresh/', 
      { refresh: refreshToken }, consts.AXIOS_HEADERS);
  
  return response.data.access;
}
export function verifyJWT(accessToken, refreshToken) {
  const response = axios.post(consts.DJANGO_URL + 'api/token/verify/',
      { token: accessToken }, consts.AXIOS_HEADERS);

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then(({data}) => {
        dispatch({ type: actionTypes.VERIFY_JWT_SUCCESS });
      })
      .catch((error) => {
        const newAccessToken = refreshJWT(refreshToken);
        if (newAccessToken) {
          sessionStorage.setItem('admin_analytics_access' , newAccessToken);
          dispatch({ type: actionTypes.VERIFY_JWT_SUCCESS });
        } else {
          sessionStorage.removeItem('admin_analytics_access');
          sessionStorage.removeItem('admin_analytics_refresh');

          dispatch({type: actionTypes.VERIFY_JWT_FAILURE});
        }
      });
  };
}

