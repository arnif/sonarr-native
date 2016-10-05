import Immutable from 'immutable';
import {Search} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  searchResults: null,
  pending: false,
  episodeReleases: null,
  episodeReleasesPending: true,
});

const actions = {
  [Search.lookup]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({pending, error});
      }
      return state.merge({pending, error, searchResults: payload});
    },
  },

  [Search.searchReleases]: {
    next(state, {payload, error, pending}) {
      if (pending || error) {
        return state.merge({episodeReleasesPending: pending, error});
      }
      return state.merge({episodeReleasesPending: pending, error, episodeReleases: payload});
    },
  },

  [Search.downloadRelease]: {
    next(state, {payload, error}) {
      console.log('downloadRelease payload', payload);
      console.log('downloadRelease error', error);
      return state;
    },
  },

  [Search.clearReleases]: (state) => state.merge({episodeReleases: null}),
};

export default handleActions(actions, initialState);
