import Immutable from 'immutable';
import {Search} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  searchResults: null,
  pending: false,
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
};

export default handleActions(actions, initialState);
