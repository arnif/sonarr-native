import Immutable from 'immutable';
import {Config} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  config: null,
  pending: false,
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
};

export default handleActions(actions, initialState);
