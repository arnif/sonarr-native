import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clearNotificationText} from '../../actions/notification';
import {BLUE} from '../../constants/brand';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    padding: 16,
    backgroundColor: BLUE,
    borderBottomWidth: 1,
    borderBottomColor: BLUE,
  },
  notificationText: {
    color: 'white',
  },
});

class NotificationWrapper extends Component {
  static propTypes = {
    text: PropTypes.string,
    clearNotificationText: PropTypes.func.isRequired,
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.text) {
        this.props.clearNotificationText();
      }
    }, 5000);
  }

  render() {
    if (!this.props.text) {
      return null;
    }
    return (
      <View style={styles.root}>
        <View style={styles.basicContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.notificationText}>
              {this.props.text}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}


const stateToProps = (state) => ({
  text: state.Notification.get('text'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    clearNotificationText,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(NotificationWrapper);
