import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {Notification} from '../constants/ActionTypes';

const actions = {
  [Notification.setNotificationText]: (text) => text,
  [Notification.clearNotificationText]: () => {},
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
