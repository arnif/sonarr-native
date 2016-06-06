import React, {Component, PropTypes} from 'react';
import {
  // Dimensions,
  ListView,
  Image,
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
// import Accordion from 'react-native-accordion';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {BlurView} from 'react-native-blur';
import {getEpisodes, downloadEpisode, resetEspisodes} from '../../actions/series';
import {BORDER_COLOR} from '../../constants/brand';

// const screen = Dimensions.get('window');

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
    backgroundColor: '#F5F8FA',
  },
  name: {
    width: 160,
    marginRight: 5,
    color: 'black',
  },
  small: {
    fontSize: 10,
    marginRight: 5,
    color: 'black',
  },

  imageContainer: {
    alignItems: 'flex-end',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
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
    episodes: PropTypes.object,
    getEpisodes: PropTypes.func.isRequired,
    downloadEpisode: PropTypes.func.isRequired,
    resetEspisodes: PropTypes.func.isRequired,
    onScroll: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      seasons: [],
    };
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state.dataSource = ds.cloneWithRows([]);
  }

  componentWillMount() {
    this.props.resetEspisodes();
  }

  componentDidMount() {
    // fetch serie details (seasons etc)
    setTimeout(() => this.props.getEpisodes(this.props.serie.get('id')), 500); // delay otherwise super laggy
  }

  componentWillReceiveProps(nextProps) {
    let prevNr;
    const seasonsArr = [];
    if (!nextProps.episodes) {
      return;
    }
    nextProps.episodes.forEach((episode) => {
      const currentNr = episode.get('seasonNumber');
      if (prevNr !== currentNr) {
        seasonsArr.push(currentNr);
      }
      prevNr = currentNr;
    });
    console.log('arr', seasonsArr);
    this.setState({
      seasons: seasonsArr,
      dataSource: this.state.dataSource.cloneWithRows(nextProps.episodes.toArray().reverse()),
    });
  }

  renderRow(row) {
    return (
      <BlurView blurType="dark" style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {`# ${row.get('episodeNumber')}  ${row.get('title')}`}
          </Text>
          <Text style={styles.small}>
            {moment(row.get('airDateUtc')).fromNow()}
          </Text>
          <Text style={styles.small}>
            {row.get('hasFile') ? 'HDTV' : <Icon name="exclamation-triangle" color="black" />}
          </Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() =>
              this.props.downloadEpisode({
                episodeIds: [row.get('id')],
                name: 'episodeSearch',
              })
            }
          >
            <Text>
              <Icon name="search" color="black" />
            </Text>
          </TouchableHighlight>
        </View>
      </BlurView>
    );
  }

  render() {
    const {serie} = this.props;
    const bannerImage = serie.get('images').find((i) => i.get('coverType') === 'fanart').get('url');
    const imageUrl = `http://10.0.1.10:8989${bannerImage}`;

    const {onScroll = () => {}} = this.props;
    return (
      <View style={styles.root}>
        <StatusBar
          barStyle="light-content"
        />
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(row) => this.renderRow(row, imageUrl)}

          renderScrollComponent={() => (
            <ParallaxScrollView
              onScroll={onScroll}
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
                  />

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
                    <Text style={styles.sectionSpeakerText}>
                      {serie.get('title')}
                    </Text>
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
    serie,
    pending: state.Series.get('episodePending'),
  });
};
const dispatchToProps = (dispatch) => {
  const actions = {
    getEpisodes,
    downloadEpisode,
    resetEspisodes,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SerieDetails);
