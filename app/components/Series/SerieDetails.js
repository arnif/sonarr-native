import React, {Component, PropTypes} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ListView,
  Image,
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  InteractionManager,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {BlurView} from 'react-native-blur';
import {getEpisodes, getEpisodesFiles, downloadEpisode, resetEspisodes} from '../../actions/series';
import {showModal} from '../../actions/modal';
import {BORDER_COLOR, BACKGROUND_GRAY, TEXT_GRAY, GREEN} from '../../constants/brand';
import {capitalizeFirstLetter, reverseObject} from '../../helpers/utilities';
import {getImageUrl} from '../Widgets/SmartImage';
import Label from '../Widgets/Label';
import FullPageLoadingIndicator from '../Widgets/FullPageLoadingIndicator';
import EpisodeDetails from './EpisodeDetails';
import SerieEdit from './SerieEdit';
const screen = Dimensions.get('window');

const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 60;
// const AVATAR_SIZE = 50;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
    // marginTop: 60,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: BACKGROUND_GRAY,
  },
  name: {
    width: 160,
    marginRight: 5,
    color: 'black',
  },
  small: {
    fontSize: 10,
    marginRight: 5,
    color: TEXT_GRAY,
  },

  button: {
    padding: 8,
    borderRadius: 3,
    backgroundColor: GREEN,
  },

  buttonLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  divider: {
    borderWidth: 1,
    borderColor: BACKGROUND_GRAY,
  },

  qualityNotMet: {
    color: '#777',
  },

  qualityMet: {
    color: 'white',
  },

  imageContainer: {
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },

  settingsWrench: {
    paddingRight: 20,
  },

  sectionHeader: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: BORDER_COLOR,
  },

  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  stickySectionText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 14,
    fontSize: 18,
  },
  // fixedSection: {
  //   position: 'absolute',
  //   bottom: 10,
  //   right: 10,
  // },
  // fixedSectionText: {
  //   color: '#999',
  //   fontSize: 20,
  // },
  parallaxHeader: {
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    height: 50,
    marginTop: PARALLAX_HEADER_HEIGHT - 50,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    padding: 5,
    paddingLeft: 20,
    width: screen.width / 1.2,
  },
  // textWrapper: {
  //   width: screen.width / 2,
  // },
  // labelWrapper: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  // },
  // label: {
  // },
  // end: {
  //   alignItems: 'flex-end',
  // },
});


class SerieDetails extends Component {
  static propTypes = {
    serie: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    episodes: PropTypes.object,
    episodesFiles: PropTypes.object,
    getEpisodes: PropTypes.func.isRequired,
    getEpisodesFiles: PropTypes.func.isRequired,
    downloadEpisode: PropTypes.func.isRequired,
    resetEspisodes: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    onScroll: PropTypes.func,
    episodePending: PropTypes.bool.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      seasons: [],
    };

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state.dataSource = ds.cloneWithRowsAndSections([]);
  }

  componentWillMount() {
    this.props.resetEspisodes();
  }

  componentDidMount() {
    // fetch serie details (seasons etc)
    InteractionManager.runAfterInteractions(() => {
      this.fetchEpisodes();
    });
  }

  componentWillReceiveProps(nextProps) {
    let prevNr;
    const seasonsArr = [];
    if (!nextProps.episodes) {
      return;
    }

    const s = {};
    nextProps.episodes.forEach((episode) => {
      const currentNr = episode.get('seasonNumber');
      if (prevNr !== currentNr) {
        s[`season_${currentNr}`] = [episode];
        seasonsArr.push(`season_${currentNr}`);
      } else {
        s[`season_${currentNr}`] = [episode, ...s[`season_${currentNr}`]];
      }
      prevNr = currentNr;
    });

    this.setState({
      seasons: seasonsArr,
      dataSource: this.state.dataSource.cloneWithRowsAndSections(reverseObject(s)),
    });
  }

  getFileEpisode(row) {
    if (!this.props.episodesFiles || !row.get('hasFile')) {
      return null;
    }
    return this.props.episodesFiles.find((ep) => ep.get('id') === row.get('episodeFileId'));
  }

  fetchEpisodes() {
    console.log('fetch');
    this.props.getEpisodes(this.props.serie.get('id'));
    this.props.getEpisodesFiles(this.props.serie.get('id'));
  }

  renderSectionHeader(sectionData, section) {
    return (
      <View style={styles.sectionHeader}>
        <Text>{capitalizeFirstLetter(section.replace('_', ' '))}</Text>
      </View>
    );
  }

  renderRow(row) {
    const fileEpisode = this.getFileEpisode(row);

    return (
      <View style={styles.row}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.props.showModal(<EpisodeDetails episode={row} series={this.props.serie} />)}
        >
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginRight: 10}}>
              {row.get('episodeNumber')}
            </Text>
            <View>
              <Text style={styles.name} numberOfLines={1}>
                {row.get('title')}
              </Text>
              <Text style={styles.small}>
                {row.get('airDateUtc') && moment(row.get('airDateUtc')).fromNow()}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        {fileEpisode ?
          <Label
            textStyle={[
              fileEpisode.get('qualityCutoffNotMet') ? styles.qualityNotMet : styles.qualityMet,
            ]}
            text={fileEpisode.getIn(['quality', 'quality', 'name'])}
            invert={fileEpisode.get('qualityCutoffNotMet')}
          />
          : <Icon name="exclamation-triangle" color="black" />}

        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={[styles.button, styles.buttonLeft]}
            underlayColor="transparent"
            onPress={() =>
              this.props.downloadEpisode({
                episodeIds: [row.get('id')],
                name: 'episodeSearch',
              })
            }
          >
            <Text>
              <Icon name="search" color="white" size={20} />
            </Text>
          </TouchableHighlight>
          <View style={styles.divider} />

          <TouchableHighlight
            style={[styles.button, styles.buttonRight]}
            underlayColor="transparent"
            onPress={() =>
              this.props.showModal(<EpisodeDetails episode={row} series={this.props.serie} selectedTab="search" />)
            }
          >
            <Text>
              <Icon name="user" color="white" size={20} />
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    const {serie, episodePending, episodes} = this.props;
    const imageUrl = getImageUrl(serie, 'fanart');

    return (
      <View style={styles.root}>
        <StatusBar
          barStyle="light-content"
        />
        {(episodePending && !episodes) &&
          <FullPageLoadingIndicator />
        }
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(row) => this.renderRow(row)}
          renderSectionHeader={(sectionData, section) => this.renderSectionHeader(sectionData, section)}
          pageSize={this.props.episodes && this.props.episodes.size || 0}

          renderScrollComponent={() => (
            <ParallaxScrollView
              onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y < -50) {
                  if (!this.overThreshold) {
                    this.fetchEpisodes();
                    this.overThreshold = true;
                  }
                } else if (this.overThreshold) {
                  this.overThreshold = false;
                }
              }}
              contentBackgroundColor="white"
              backgroundColor="transparent"
              headerBackgroundColor="#333"
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}

              renderBackground={() => (
                <View key="background">
                  <Image
                    style={styles.imageContainer}
                    source={{uri: imageUrl,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT}}
                  >
                    <ActivityIndicator
                      animating={episodePending && (episodes && episodes.size > 0)}
                      style={{
                        height: 80,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      color="white"
                      size="large"
                    />
                  </Image>

                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: window.width,
                      backgroundColor: 'rgba(0,0,0,.4)',
                      height: PARALLAX_HEADER_HEIGHT,
                    }}
                  />
                </View>
              )}

              renderForeground={() => (
                <View key="parallax-header" style={styles.parallaxHeader}>
                  <BlurView blurType="dark" style={styles.container}>
                    <Text style={styles.sectionSpeakerText} numberOfLines={1}>
                      {serie.get('title')}
                    </Text>
                    <Icon
                      name="wrench"
                      color="white"
                      size={26}
                      style={styles.settingsWrench}
                      onPress={() => this.props.showModal(<SerieEdit serie={serie} navigator={this.props.navigator} />)}
                    />
                  </BlurView>
                </View>
              )}

              renderStickyHeader={() => (
                <Image
                  source={{uri: imageUrl,
                  width: window.width,
                  height: STICKY_HEADER_HEIGHT}}
                >
                  <View key="sticky-header" style={styles.stickySection}>
                    <BlurView blurType="dark" style={styles.container}>
                      <Text style={styles.stickySectionText}>
                        {serie.get('title')}
                      </Text>
                    </BlurView>
                  </View>
                </Image>
              )}

              // renderFixedHeader={() => (
              //   <View key="fixed-header" style={styles.fixedSection}>
              //     <Text style={styles.fixedSectionText}
              //           onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
              //       Scroll to top
              //     </Text>
              //   </View>
              // )}
            />
          )}
        />
      </View>
    );
  }
}

const stateToProps = (state, props) => {
  const serie = state.Series.get('series').find((s) => s.get('id') === props.serieId);
  return ({
    episodes: state.Series.get('serieEpisodes'),
    episodesFiles: state.Series.get('serieEpisodesFiles'),
    serie,
    episodePending: state.Series.get('episodePending'),
    profile: state.Config.get('profile'),
  });
};
const dispatchToProps = (dispatch) => {
  const actions = {
    getEpisodes,
    getEpisodesFiles,
    downloadEpisode,
    resetEspisodes,
    showModal,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SerieDetails);
