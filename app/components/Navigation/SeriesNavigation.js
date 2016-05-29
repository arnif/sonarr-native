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
  navTransparent: {
    height: 60,
    backgroundColor: 'transparent',
  },
  title: {
    marginTop: 4,
    fontSize: 16,
    color: 'white',
  },
});


class SeriesNavigation extends Component { // https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30

  constructor() {
    super();
    this.state = {
      index: 0,
    };

    this.NavigationBarRouteMapper = {
      LeftButton(route, navigator, index) { // route, navigator, index, navState
        if (index > 0) {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {
                navigator.pop();
              }}
            >
              <Text style={styles.leftNavButtonText}>{'<'}</Text>
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
          barStyle="light-content"
        />
        <Navigator
          initialRoute={{
            name: 'Series',
            index: 0,
            component: SeriesList,
            onPress: () => { console.log('press'); },
            rightText: 'Add',
          }}
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

export default SeriesNavigation;
