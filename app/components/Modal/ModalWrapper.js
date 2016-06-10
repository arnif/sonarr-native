import React, {Component, PropTypes} from 'react';
import {View, Modal, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hideModal, showModal} from '../../actions/modal';

class ModalWrapper extends Component {
  static propTypes = {
    isModalVisible: PropTypes.bool.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    modalData: PropTypes.any,
  }
  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.isModalVisible}
        onRequestClose={() => console.log('close')}
      >
        <View style={{flex: 1, marginTop: 20, marginLeft: 6}}>
          <View>
            <TouchableHighlight underlayColor="transparent" onPress={this.props.hideModal}>
              <Text style={{color: 'red'}}>Close</Text>
            </TouchableHighlight>
          </View>

          <View>
            {this.props.modalData && this.props.modalData.toJS()}
          </View>
        </View>

      </Modal>
    );
  }
}

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
