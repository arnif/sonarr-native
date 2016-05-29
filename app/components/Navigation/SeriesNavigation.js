import React, {Component} from 'react';
import {StatusBar, View, TouchableHighlight, Navigator, Text, StyleSheet} from 'react-native';
import SeriesList from '../Series/SeriesList';

const styles = StyleSheet.create({
  leftNavButtonText: {
    fontSize: 18,
    marginLeft: 13,
    marginTop: 2,
    color: 'white',
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight: 13,
    marginTop: 2,
    color: 'white',
  },
  nav: {
    height: 60,
    backgroundColor: '#3EB5DB',
  },
  title: {
    marginTop: 4,
    fontSize: 16,
    color: 'white',
  },
});

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index) { // route, navigator, index, navState
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop(); } }}
        >
          <Text style={styles.leftNavButtonText}>Back</Text>
        </TouchableHighlight>
      );
    }
    return null;
  },

  RightButton(route) {
    if (route.onPress) {
      return (
        <TouchableHighlight
          onPress={() => route.onPress()}
        >
          <Text style={styles.rightNavButtonText}>
            {route.rightText || 'Right Button'}
          </Text>
        </TouchableHighlight>
     );
    }
    return null;
  },

  Title(route) {
    return (
      <Text style={styles.title}>{route.name}</Text>
    );
  },
};


class SeriesNavigation extends Component { // https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30

  renderScene(route, navigator) {
    return (
      <route.component {...route.passProps} navigator={navigator} />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
        />
        <Navigator
          initialRoute={{name: 'Series', index: 0, component: SeriesList}}
          renderScene={(route, navigator) =>
            this.renderScene(route, navigator)
          }
          navigationBar={
            <Navigator.NavigationBar
              style={styles.nav}
              routeMapper={NavigationBarRouteMapper}
            />
           }
        />
      </View>
    );
  }
}

export default SeriesNavigation;
