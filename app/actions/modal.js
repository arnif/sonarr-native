import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {Modal} from '../constants/ActionTypes';

const actions = {
  [Modal.showModal]: (data) => data,
  [Modal.hideModal]: () => {},
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
