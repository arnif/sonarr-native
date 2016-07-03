import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfile, getRootFolder} from '../../actions/config';
import {BLUE} from '../../constants/brand';
import SeriesNavigation from './SeriesNavigation';
import ActivityNavigation from './ActivityNavigation';
import ConfigureApp from '../InitialSetup/ConfigureApp';
import ModalWrapper from '../Modal/ModalWrapper';

const styles = StyleSheet.create({
  selectedTab: {
    color: BLUE,
  },
});

class Navigation extends Component {
  static propTypes = {
    getProfile: PropTypes.func.isRequired,
    getRootFolder: PropTypes.func.isRequired,
    profile: PropTypes.object,
    rootFolder: PropTypes.object,
    pending: PropTypes.bool,
  }

  constructor() {
    super();
    this.state = {
      selectedTab: 'series',
      loaded: false,
    };
  }

  componentWillMount() {
    this.props.getProfile().then((profileResponse) => {
      if (profileResponse.payload) {
        this.props.getRootFolder().then((rootFolderResponse) => {
          if (!rootFolderResponse.payload && !rootFolderResponse.pending) {
            this.setState({
              selectedTab: 'configure',
              loaded: true,
            });
          } else {
            this.setState({
              selectedTab: 'series',
              loaded: true,
            });
          }
        });
      } else if (!profileResponse.pending) {
        this.setState({
          selectedTab: 'configure',
          loaded: true,
        });
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <View style={{flex: 1}}>
        <ModalWrapper />
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
      </View>
    );
  }
}

const stateToProps = (state) => ({
  profile: state.Config.get('profile'),
  rootFolder: state.Config.get('rootFolder'),
  pending: state.Config.get('pending'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    getProfile,
    getRootFolder,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(Navigation);
