import _ from 'lodash';
import React from 'react';

import * as actionTypes from '../action/action_types';

export default function(state={}, action) {
    if (action.type === actionTypes.FETCH_JWT) {
        state = {...state, ...action.payload.data}
    }

    if (action.type === actionTypes.REFRESH_JWT) {
        state = {...state, ...action.payload.data}
    }

    if (action.type === actionTypes.LOGOUT) {
        state = _.omit(state, ['access', 'refresh']) 
    }

    return state;
}