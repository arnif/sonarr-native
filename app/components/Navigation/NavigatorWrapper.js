import React, {Component, PropTypes} from 'react';
import {StatusBar, View, TouchableHighlight, Navigator, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BLUE, BORDER_COLOR} from '../../constants/brand';
import {NAV_HEIGHT} from '../../constants/variables';

const styles = StyleSheet.create({
  leftNavButtonText: {
    fontSize: 18,
    marginLeft: 13,
    marginTop: 8,
    color: 'white',
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight: 13,
    marginTop: 8,
    color: BLUE,
  },
  filterButtonText: {
    fontSize: 18,
    marginLeft: 13,
    marginTop: 8,
    color: BLUE,
  },
  nav: {
    flex: 1,
    height: NAV_HEIGHT,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
  },
  navTransparent: {
    height: NAV_HEIGHT,
    backgroundColor: 'transparent',
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    color: BLUE,
  },
});


class NavigatorWrapper extends Component { // https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30

  static propTypes = {
    initialRoute: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      index: 0,
    };

    this.NavigationBarRouteMapper = {
      LeftButton(route, navigator, index) { // route, navigator, index, navState
        if (route.name === 'Series') {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => route.onLeftPress()}
            >
              <Text style={styles.filterButtonText}>
                {route.leftText}
              </Text>
            </TouchableHighlight>
          );
        }
        if (index > 0) {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {
                navigator.pop();
              }}
            >
              <Text style={styles.leftNavButtonText}>
                <Icon size={24} name="chevron-left" />
              </Text>
            </TouchableHighlight>
          );
        }
        return null;
      },

      RightButton(route) {
        if (route.onPress) {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => route.onPress()}
            >
              <Text style={styles.rightNavButtonText}>
                {route.rightText}
              </Text>
            </TouchableHighlight>
         );
        }
        return null;
      },

      Title(route) {
        if (route.index > 0) {
          return null;
        }
        return (
          <Text style={styles.title}>
            {route.name}
          </Text>
        );
      },
    };
  }

  handleWillFocus(route) {
    this.setState({index: route.index});
  }

  renderScene(route, navigator) {
    return (
      <route.component
        {...route.passProps}
        navigator={navigator}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="default"
        />
        <Navigator
          initialRoute={this.props.initialRoute}
          renderScene={(route, navigator) =>
            this.renderScene(route, navigator)
          }
          onWillFocus={(route) => this.handleWillFocus(route)}
          navigationBar={
            <Navigator.NavigationBar
              style={this.state.index === 0 ? styles.nav : styles.navTransparent}
              routeMapper={this.NavigationBarRouteMapper}
            />
           }
        />
      </View>
    );
  }
}

export default NavigatorWrapper;
