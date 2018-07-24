import _ from 'lodash';
import React from 'react';

import {FETCH_JWT, REFRESH_JWT, LOGOUT} from '../actions/index';

export default function(state={}, action) {
    if (action.type === FETCH_JWT) {
        state = {...state, ...action.payload.data}
    }

    if (action.type === REFRESH_JWT) {
        state = {...state, ...action.payload.data}
    }

    if (action.type === LOGOUT) {
        state = _.omit(state, ['access', 'refresh']) 
    }

    return state;
}