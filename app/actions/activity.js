import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {Activity} from '../constants/ActionTypes';
import * as apiActions from './api';

const actions = {
  [Activity.getHistory]: () => apiActions.get('/history?page=1&pageSize=15&sortKey=date&sortDir=desc'),
  [Activity.getQueue]: () => apiActions.get('/queue?sort_by=timeleft&order=asc'),
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
