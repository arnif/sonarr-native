import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
// import SeriesList from '../Series/SeriesList';
import {BLUE} from '../../constants/brand';
import SeriesNavigation from './SeriesNavigation';
import ActivityNavigation from './ActivityNavigation';
import ConfigureApp from '../InitialSetup/ConfigureApp';
// import Activity from '../Activity/Activity';

const styles = StyleSheet.create({
  selectedTab: {
    color: BLUE,
  },
});

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
          selectedTitleStyle={styles.selectedTab}
          renderIcon={() => <Icon name="play" size={26} color="#B9B9B9" />}
          renderSelectedIcon={() => <Icon name="play" size={26} color={BLUE} />}
          // badgeText="1"
          onPress={() => this.setState({selectedTab: 'series'})}
        >
          <SeriesNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'activity'}
          title="Activity"
          selectedTitleStyle={styles.selectedTab}
          renderIcon={() => <Icon name="clock-o" size={26} color="#B9B9B9" />}
          renderSelectedIcon={() => <Icon name="clock-o" size={26} color={BLUE} />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({selectedTab: 'activity'})}
        >
          <ActivityNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'configure'}
          title="Configure"
          selectedTitleStyle={styles.selectedTab}
          renderIcon={() => <Icon name="cogs" size={26} color="#B9B9B9" />}
          renderSelectedIcon={() => <Icon name="cogs" size={26} color={BLUE} />}
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
