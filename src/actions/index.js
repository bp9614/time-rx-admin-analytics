import axios from 'axios';

export const FETCH_JWT_SUCCESS = 'FETCH_JWT_SUCCESS';
export const FETCH_JWT_FAILURE = 'FETCH_JWT_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REFRESH_JWT_SUCCESS = 'REFRESH_JWT_SUCCESS';
export const REFRESH_JWT_FAILURE = 'REFRESH_JWT_FAILURE';
export const VERIFY_JWT_SUCCESS = 'VERIFY_JWT_SUCCESS';
export const VERIFY_JWT_FAILURE = 'VERIFY_JWT_FAILURE';

const DJANGO_URL = 'http://localhost:8000/';

export function fetchJWT(username, password) {
    const response = axios.post(DJANGO_URL + 'api/token/', {
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

                dispatch({type: FETCH_JWT_SUCCESS, payload: data});
            })
            .catch((error) => {
                dispatch({type: FETCH_JWT_FAILURE});
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
    const response = axios.post(DJANGO_URL + 'api/token/refresh/', {
        params: {
            refresh: refreshToken,
        }
    });

    return (dispatch) => {
        response
            .then(({data}) => {
                sessionStorage.setItem('', response.data.access);
                
                dispatch({type: REFRESH_JWT_SUCCESS, payload: data});
            })
            .catch((error) => {
                dispatch({type: REFRESH_JWT_FAILURE});
            });
    };
}

export function verifyJWT(accessToken) {
    const response = axios.post(DJANGO_URL + 'api/token/verify/', {
        params: {
            access: accessToken,
        }
    });

    return (dispatch) => {
        response
            .then(({data}) => {
                dispatch({type: VERIFY_JWT_SUCCESS});
            })
            .catch((error) => {
                dispatch({type: VERIFY_JWT_FAILURE});
            });
    };
}