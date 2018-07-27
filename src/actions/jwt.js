import axios from 'axios';

import * as consts from '../consts';
import * as actionTypes from './action_types';

export function fetchJWT(username, password) {
    const response = axios.post(consts.DJANGO_URL + 'api/token/', {
        params: {
            username,
            password,
        }
    });

    return (dispatch) => {
        response
            .then(({data}) => {
                sessionStorage.setItem('', response.data.access);
                sessionStorage.setItem('', response.data.refresh);

                dispatch({type: actionTypes.FETCH_JWT_SUCCESS, payload: data});
            })
            .catch((error) => {
                dispatch({type: actionTypes.FETCH_JWT_FAILURE});
            });
    };
}

export function logout() {
    sessionStorage.removeItem('admin_analytics_token');
    sessionStorage.removeItem('admin_analytics_refresh_token');

    return {
        type: LOGOUT,
    };
}

export function refreshJWT(refreshToken) {
    const response = axios.post(consts.DJANGO_URL + 'api/token/refresh/', {
        params: {
            refresh: refreshToken,
        }
    });

    return (dispatch) => {
        response
            .then(({data}) => {
                sessionStorage.setItem('', response.data.access);
                
                dispatch({type: actionTypes.REFRESH_JWT_SUCCESS, payload: data});
            })
            .catch((error) => {
                dispatch({type: actionTypes.REFRESH_JWT_FAILURE});
            });
    };
}

export function verifyJWT(accessToken) {
    const response = axios.post(consts.DJANGO_URL + 'api/token/verify/', {
        params: {
            access: accessToken,
        }
    });

    return (dispatch) => {
        response
            .then(({data}) => {
                dispatch({type: actionTypes.VERIFY_JWT_SUCCESS});
            })
            .catch((error) => {
                dispatch({type: actionTypes.VERIFY_JWT_FAILURE});
            });
    };
}