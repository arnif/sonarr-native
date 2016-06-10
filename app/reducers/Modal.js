import Immutable from 'immutable';
import {Modal} from '../constants/ActionTypes';
import {handleActions} from 'redux-actions';

const initialState = Immutable.fromJS({
  modalData: null,
  isVisible: false,
});

const actions = {
  [Modal.showModal]: (state, {payload}) => state.merge({modalData: payload, isVisible: true}),
  [Modal.hideModal]: (state) => state.merge({modalData: null, isVisible: false}),
};

export default handleActions(actions, initialState);
