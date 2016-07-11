import Immutable from 'immutable';
import {Series} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';
import moment from 'moment';

const initialState = Immutable.fromJS({
  series: null,
  pending: false,
  serieEpisodes: null,
  serieEpisodesFiles: null,
  episodePending: false,
  episodeFilesPending: false,
  showFilter: false,
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

  [Series.getEpisodesFiles]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({episodeFilesPending: pending, error});
      }
      return state.merge({episodeFilesPending: pending, error, serieEpisodesFiles: payload});
    },
  },

  [Series.resetEspisodes]: (state) => state.merge({serieEpisodes: null}),

  [Series.addSerie]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      console.log('SERIES REDUCER', payload);
      return state;
    },
  },

  [Series.showFilter]: (state) => state.merge({showFilter: true}),

  [Series.hideFilter]: (state) => state.merge({showFilter: false}),

  [Series.sortSeries]: (state, {payload}) => {
    // percenteOfEpisodes should really be used instead of totalEpisodeCount and checked seperatly to get
    // the same functonality as on sonar web client but the calculations are weird.
    let newState;

    if (payload === 'nextAiring') {
      newState = state.merge({series: state.get('series').sortBy(s => {
        let nextAiring = 0;
        if (s.get(payload)) {
          nextAiring = moment(s.get(payload)).unix();
        } else {
          nextAiring = Number.MAX_SAFE_INTEGER;
        }
        return nextAiring;
      })});
    } else {
      newState = state.merge({series: state.get('series').sortBy(s => s.get(payload))});
    }
    return newState;
  },
};

export default handleActions(actions, initialState);
