import {Search, Notification, Series} from '../constants/ActionTypes';

const MAPPER = {
  [Search.downloadRelease]: (object) =>
    `Added to client: ${object.title}`,
  [Series.downloadEpisode]: () =>
    'Search request sent to server',
  [Series.addSerie]: (object) =>
    `Added ${object.title} to library`,
  [Series.deleteSeries]: () =>
    'Series deleted from library',
};

const inAppNotificationMiddleware = ({dispatch}) => next => action => {
  if (action.pending || !action.payload) {
    return next(action);
  }

  if (MAPPER[action.type]) {
    const text = MAPPER[action.type](action.payload);
    dispatch({type: Notification.setNotificationText, payload: text});
  }
  return next(action);
};

export default inAppNotificationMiddleware;
