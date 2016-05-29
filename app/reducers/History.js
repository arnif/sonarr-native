import Immutable from 'immutable';
import {History} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  history: null,
  pending: false,
});

const actions = {
  [History.getHistory]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      return state.merge({pending, error, history: payload});
    },
  },
};

export default handleActions(actions, initialState);
