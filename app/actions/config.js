import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {Config} from '../constants/ActionTypes';
import * as apiActions from './api';

const actions = {
  [Config.getConfig]: () => apiActions.get(`/config/ui`),
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
