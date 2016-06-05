import Immutable from 'immutable';
import {Activity} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  history: null,
  queue: null,
  pending: false,
});

const actions = {
  [Activity.getHistory]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      return state.merge({pending, error, history: payload});
    },
  },

  [Activity.getQueue]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      return state.merge({pending, error, queue: payload});
    },
  },
};

export default handleActions(actions, initialState);
