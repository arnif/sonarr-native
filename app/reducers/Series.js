import Immutable from 'immutable';
import {Series} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  series: null,
  pending: false,
  serieEpisodes: null,
  episodePending: false,
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
  [Series.getEpisodes]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({episodePending: pending, error});
      }
      return state.merge({episodePending: pending, error, serieEpisodes: payload});
    },
  },
};

export default handleActions(actions, initialState);
