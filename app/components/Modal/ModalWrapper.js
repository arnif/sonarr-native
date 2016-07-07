import React, {PropTypes} from 'react';
import {View, Modal} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hideModal, showModal} from '../../actions/modal';

const ModalWrapper = ({isModalVisible, modalData}) => (
  <Modal
    animationType="slide"
    visible={isModalVisible}
    onRequestClose={() => console.log('close')}
  >
    <View style={{flex: 1}}>
      {modalData && modalData.toJS()}
    </View>
  </Modal>
);

ModalWrapper.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.any,
  showClose: PropTypes.bool,
};

const stateToProps = (state) => ({
  modalData: state.Modal.get('modalData'),
  isModalVisible: state.Modal.get('isVisible'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    hideModal,
    showModal,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(ModalWrapper);
