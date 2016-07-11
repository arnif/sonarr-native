import {createAction} from 'redux-actions';
import mapValues from 'lodash.mapvalues';
import {Series} from '../constants/ActionTypes';
import * as apiActions from './api';

const actions = {
  [Series.getSeries]: (filter = 'sortTitle') => apiActions.get(`/series?sort_by=${filter}&order=asc`),
  [Series.getEpisodes]: (id) => apiActions.get(`/episode?seriesId=${id}`),
  [Series.getEpisodesFiles]: (id) => apiActions.get(`/episodefile?seriesId=${id}`),
  [Series.downloadEpisode]: (data) => apiActions.post('/command', data),
  [Series.resetEspisodes]: () => {},
  [Series.addSerie]: (data) => apiActions.post('/series', data),
  [Series.deleteEpisodeFromFile]: (episodeFileId) => apiActions.remove(`/episodefile/${episodeFileId}`),
  [Series.showFilter]: () => {},
  [Series.hideFilter]: () => {},
  [Series.sortSeries]: (filter) => filter,
};

module.exports = mapValues(actions, (action, type) => createAction(type, action));
