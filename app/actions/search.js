import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {Search} from '../constants/ActionTypes';
import * as apiActions from './api';

const actions = {
  [Search.lookup]: (text) => apiActions.get(`/series/lookup?term=${text}`),
  [Search.searchReleases]: (episodeId) =>
    apiActions.get(`/release?episodeId=${episodeId}&sort_by=releaseWeight&order=asc`),
  [Search.downloadRelease]: (data) => apiActions.post('/release', data),
  [Search.clearReleases]: () => {},
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
