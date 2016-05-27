import Immutable from 'immutable';
import {Series} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  series: null,
  pending: false,
});

const actions = {
  [Series.getSeries]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      return state.merge({pending, error, series: payload});
    },
  },
};

export default handleActions(actions, initialState);
