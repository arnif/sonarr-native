import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {History} from '../constants/ActionTypes';
import * as apiActions from './api';

const actions = {
  [History.getHistory]: () => apiActions.get(`/history?page=1&pageSize=15&sortKey=date&sortDir=desc`),
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
