import Immutable from 'immutable';
import {Notification} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  text: null,
});

const actions = {
  [Notification.setNotificationText]: (state, {payload}) => state.merge({text: payload}),
  [Notification.clearNotificationText]: (state) => state.merge({text: null}),
};

export default handleActions(actions, initialState);
