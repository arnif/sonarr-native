import React, {Component} from 'react';
// import {Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
// import Icon from 'react-native-vector-icons/Ionicons';
// import SeriesList from '../Series/SeriesList';
import SeriesNavigation from './SeriesNavigation';
import ConfigureApp from '../InitialSetup/ConfigureApp';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'series',
    };
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'series'}
          title="Series"
          // renderIcon={() => <Icon name="ios-person" size={30} color="#4F8EF7" />}
          // renderSelectedIcon={() => <Icon name="ios-person" size={30} color="#FFFFFF" />}
          // badgeText="1"
          onPress={() => this.setState({selectedTab: 'series'})}
        >
          <SeriesNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'configure'}
          title="Configure"
          // renderIcon={() => <Icon name="ios-person" size={30} color="#4F8EF7" />}
          // renderSelectedIcon={() => <Icon name="ios-person" size={30} color="#FFFFFF" />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({selectedTab: 'configure'})}
        >
          <ConfigureApp />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

export default Navigation;
