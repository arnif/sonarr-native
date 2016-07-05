import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hideModal} from '../../actions/modal';
import {BACKGROUND_GRAY, BLUE} from '../../constants/brand';
import {padWithZero} from '../../helpers/utilities';
import EpisodeSearch from './EpisodeDetails/EpisodeSearch';
import EpisodeSummary from './EpisodeDetails/EpisodeSummary';
import EpisodeHistory from './EpisodeDetails/EpisodeHistory';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    marginTop: 6,
    fontSize: 18,
    textAlign: 'center',
  },
  close: {
    padding: 7,
  },
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 4,
    height: 0,
  },
  tabText: {
    textAlign: 'center',
    color: BLUE,
  },

  rightButton: {
    width: screen.width / 3.3,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BLUE,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
  },
  middleButton: {
    width: screen.width / 3.3,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderWidth: 1,
    borderColor: BLUE,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  leftButton: {
    width: screen.width / 3.3,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BLUE,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  selected: {
    backgroundColor: BLUE,
  },
  selectedText: {
    color: 'white',
  },

  componentWrapper: {
    marginTop: 60,
  },
});


class EpisodeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRoute: {
        name: 'summary',
        component:
          <EpisodeSummary
            episode={this.props.episode}
            episodeFile={this.props.episodeFile}
            quality={this.props.quality}
            series={this.props.series}
          />,
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
    const {episode, series} = this.props;
    console.log('details', this.props);
    const episodeNr = `${episode.seasonNumber}x${padWithZero(episode.episodeNumber)}`;
    return (
      <View>
        <StatusBar
          backgroundColor={BACKGROUND_GRAY}
          hidden
          animated
        />
        <View>
          <TouchableHighlight style={styles.close} underlayColor="transparent" onPress={this.props.hideModal}>
            <Icon name="close" size={20} color="#B9B9B9" />
          </TouchableHighlight>
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {`${series.title} - ${episodeNr} - ${episode.title}`}
        </Text>

        <View style={styles.tabWrapper}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() =>
              this.onPress(
                'summary',
                <EpisodeSummary
                  episode={episode}
                  episodeFile={this.props.episodeFile}
                  quality={this.props.quality}
                  series={this.props.series}
                />
              )
            }
          >
            <View style={[styles.rightButton, this.state.selectedRoute.name === 'summary' && styles.selected]}>
              <Text style={[styles.tabText, this.state.selectedRoute.name === 'summary' && styles.selectedText]}>
                Summary
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() =>
              this.onPress(
                'history',
                <EpisodeHistory
                  episode={episode}
                  episodeFile={this.props.episodeFile}
                  quality={this.props.quality}
                  series={this.props.series}
                />
              )
            }
          >
            <View style={[styles.middleButton, this.state.selectedRoute.name === 'history' && styles.selected]}>
              <Text style={[styles.tabText, this.state.selectedRoute.name === 'history' && styles.selectedText]}>
                History
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() =>
              this.onPress(
                'search',
                <EpisodeSearch
                  episode={episode}
                  episodeFile={this.props.episodeFile}
                  quality={this.props.quality}
                  series={this.props.series}
                />
              )
            }
          >
            <View style={[styles.leftButton, this.state.selectedRoute.name === 'search' && styles.selected]}>
              <Text style={[styles.tabText, this.state.selectedRoute.name === 'search' && styles.selectedText]}>
                Search
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.componentWrapper}>
          {this.state.selectedRoute.component}
        </View>

      </View>
    );
  }
}

EpisodeDetails.propTypes = {
  hideModal: PropTypes.func.isRequired,
  episode: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
  episodeFile: PropTypes.object,
  quality: PropTypes.object.isRequired,
};

const stateToProps = (state, props) => {
  const episodeFile =
  state.Series.get('serieEpisodesFiles')
  .find((episode) => episode.get('id') === props.episode.episodeFileId);
  return {
    episodeFile: episodeFile && episodeFile.toJS(),
    quality: state.Config.get('profile').find((p) => p.get('id') === props.series.profileId).toJS(),
  };
};

const dispatchToProps = (dispatch) => {
  const actions = {
    hideModal,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(EpisodeDetails);
