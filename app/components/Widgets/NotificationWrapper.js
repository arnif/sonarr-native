import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clearNotificationText} from '../../actions/notification';
import {BLUE} from '../../constants/brand';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  basicContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    overflow: 'hidden',
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

  constructor(props) {
    super(props);

    this.state = {
      animTransform: new Animated.Value(100),
    };
  }

  componentWillReceiveProps(nextProps) {
    // keep the last given text to keep it displayed while
    // animating leave
    if (!nextProps.text && this.props.text) {
      this.setState({backupText: this.props.text});
    }
  }

  componentDidUpdate(prevProps) {
    // animate text in
    if (this.props.text && !prevProps.text) {
      Animated.spring(this.state.animTransform, {
        toValue: 0,
      }).start();

      // clear notification after a delay.
      // (this should be handled in the action..)
      setTimeout(() => {
        this.props.clearNotificationText();
        this.timeout = undefined;
      }, 5e3);
    }

    // animate text out
    if (!this.props.text && prevProps.text) {
      Animated.spring(this.state.animTransform, {
        toValue: 100,
        tension: -10,
      }).start();
    }
  }

  render() {
    const {animTransform, backupText} = this.state;
    return (
      <View style={styles.root} pointerEvents='none'>
        <View style={styles.basicContainer}>

          <Animated.View
            style={[styles.modalContainer, {
              transform: [{
                translateY: animTransform,
              }],
            }]}
          >
            <Text style={styles.notificationText}>
              {this.props.text || backupText}
            </Text>
          </Animated.View>

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
