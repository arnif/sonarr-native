import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {Series} from '../constants/ActionTypes';
import * as apiActions from './api';

const actions = {
  [Series.getSeries]: () => apiActions.get(`/series?sort_by=sortTitle&order=asc`),
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
