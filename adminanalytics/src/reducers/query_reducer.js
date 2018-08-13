import * as actionTypes from '../actions/action_types';

const defaultState = {
  chartTitle: "<No Charts Yet (By count)>",
  chart: {},
  historyTitle: "<No History Yet (By log)>",
  history: [],
}

export default function(state=defaultState, action) {
    switch(action.type) {
    case actionTypes.HAS_CHART:
      state = {
        ...state,
        chartTitle: action.payload.chartTitle,
        chart: action.payload.chart,
      }
      break;
    case actionTypes.HAS_HISTORY:
      state = {
        ...state,
        historyTitle: action.payload.historyTitle,
        history: action.payload.history,
      }
      break;
    default:
  }

  return state;
}