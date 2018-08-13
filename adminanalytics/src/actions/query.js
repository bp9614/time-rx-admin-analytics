import _ from 'lodash';
import axios from 'axios';
import * as actionTypes from './action_types';
import * as consts from '../consts/index';
import { authorizationTokenCreator } from '../functions/index';

export function query(dispatch, access, details) {
  const response = axios.post(consts.DJANGO_URL + 'api/query', details, {
    headers: authorizationTokenCreator(access)
  });

  dispatch({ type: actionTypes.LOADING });

  response
    .then(({data}) => {
      if (_.isEmpty(data)) {
        dispatch({ type: actionTypes.EMPTY_RESPONSE });
      }

      if ('chart' in data) {
        dispatch({ type: actionTypes.HAS_CHART, payload: data });
      }

      if ('history' in data) {
        dispatch({ type: actionTypes.HAS_HISTORY, payload: data});
      }
    })
    .catch((error) => {
      dispatch({ type: actionTypes.EMPTY_RESPONSE });
    });
}