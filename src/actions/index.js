import axios from 'axios';

export const FETCH_JWT = 'FETCH_JWT';
export const LOGOUT = 'LOGOUT';
export const REFRESH_JWT = 'REFRESH_JWT';

const DJANGO_URL = 'http://localhost:8000/';

export function fetchJWT(username, password) {
    const response = axios.post(DJANGO_URL + 'api/token/', {
        params: {
            username,
            password,
        }
    }).then(response => {
        if (response.status === 200) {
            sessionStorage.setItem('admin_analytics_token', response.access);
            sessionStorage.setItem('admin_analytics_refresh_token', 
                                   response.refresh);
        }

        return response;
    });

    return {
        type: FETCH_JWT,
        payload: response,
    }
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
    }).then(response => {
        if (response.status === 200) {
            sessionStorage.setItem('admin_analytics_token', response.access);
        }

        return response;
    });

    return {
        type: REFRESH_JWT,
    }
}