import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {Config} from '../constants/ActionTypes';
import * as apiActions from './api';

const actions = {
  [Config.getConfig]: () => apiActions.get(`/config/ui`),
  [Config.getProfile]: () => apiActions.get(`/profile`),
  [Config.getRootFolder]: () => apiActions.get(`/rootfolder`),
  [Config.getSystemStatus]: () => apiActions.get(`/system/status`),
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
