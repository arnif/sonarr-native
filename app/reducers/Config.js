import Immutable from 'immutable';
import {Config} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  config: null,
  pending: false,
  profile: null,
  rootFolder: null,
});

const actions = {
  [Config.getConfig]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      return state.merge({pending, error, config: payload});
    },
  },

  [Config.getProfile]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      return state.merge({pending, error, profile: payload});
    },
  },

  [Config.getRootFolder]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      return state.merge({pending, error, rootFolder: payload});
    },
  },
};

export default handleActions(actions, initialState);
