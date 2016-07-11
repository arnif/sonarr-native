import Immutable from 'immutable';

module.exports = {
  STORAGE_KEY: '@SonarrApp:config',
  MONITOR_ITEMS: Immutable.fromJS([{
    id: 0,
    name: 'All',
  }, {
    id: 1,
    name: 'Future',
  }, {
    id: 2,
    name: 'Missing',
  }, {
    id: 3,
    name: 'Existing',
  }, {
    id: 4,
    name: 'First Season',
  }, {
    id: 5,
    name: 'Latest Season',
  }, {
    id: 6,
    name: 'None',
  }]),
  SERIES_TYPES: Immutable.fromJS([{
    id: 0,
    name: 'Standard',
  }, {
    id: 1,
    name: 'Daily',
  }, {
    id: 2,
    name: 'Anime',
  }]),
  SERIES_FILTER: Immutable.fromJS([{
    id: 0,
    name: 'Title',
    param: 'sortTitle',
  }, {
    id: 1,
    name: 'Season',
    param: 'seasonCount',
  }, {
    id: 2,
    name: 'Quality',
    param: 'profileId',
  }, {
    id: 3,
    name: 'Network',
    param: 'network',
  }, {
    id: 4,
    name: 'Next Airing',
    param: 'nextAiring',
  }, {
    id: 5,
    name: 'Episodes',
    param: 'totalEpisodeCount',
  }]),
  NAV_HEIGHT: 62,
};
