import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import HistoryList from './HistoryList';
import QueueList from './QueueList';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 60,
    height: 0,
  },
  tabText: {
    textAlign: 'center',
    color: '#3EB5DB',
  },

  rightButton: {
    width: screen.width / 2.3,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3EB5DB',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
  },

  leftButton: {
    width: screen.width / 2.3,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3EB5DB',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  selected: {
    backgroundColor: '#3EB5DB',
  },
  selectedText: {
    color: 'white',
  },
});

class Activity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRoute: {
        name: 'history',
        component: <HistoryList {...this.props} />,
      },
    };
  }

  onPress(routeName, component) {
    this.setState({
      selectedRoute: {
        name: routeName,
        component,
      },
    });
  }

  render() {
    return (
      <View>
        <View style={styles.tabWrapper}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.onPress('history', <HistoryList {...this.props} />)}
          >
            <View style={[styles.rightButton, this.state.selectedRoute.name === 'history' && styles.selected]}>
              <Text style={[styles.tabText, this.state.selectedRoute.name === 'history' && styles.selectedText]}>
                History
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.onPress('queue', <QueueList {...this.props} />)}
          >
            <View style={[styles.leftButton, this.state.selectedRoute.name === 'queue' && styles.selected]}>
              <Text style={[styles.tabText, this.state.selectedRoute.name === 'queue' && styles.selectedText]}>
                Queue
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        {this.state.selectedRoute.component}
      </View>
    );
  }
}


export default Activity;
