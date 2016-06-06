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
import {getEpisodes, downloadEpisode, resetEspisodes} from '../../actions/series';


// const screen = Dimensions.get('window');

const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    // marginTop: 60,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    width: 160,
    marginRight: 5,
  },
  small: {
    fontSize: 10,
    marginRight: 5,
  },

  // stickySection: {
  //   height: STICKY_HEADER_HEIGHT,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // stickySectionText: {
  //   color: 'white',
  //   fontSize: 20,
  //   margin: 10,
  // },
  // fixedSection: {
  //   position: 'absolute',
  //   bottom: 10,
  //   right: 10,
  // },
  // fixedSectionText: {
  //   color: '#999',
  //   fontSize: 20,
  // },
  // parallaxHeader: {
  //   alignItems: 'center',
  //   flex: 1,
  //   flexDirection: 'column',
  //   paddingTop: 100,
  // },
  // avatar: {
  //   marginBottom: 10,
  //   borderRadius: AVATAR_SIZE / 2,
  // },
  // sectionSpeakerText: {
  //   color: 'white',
  //   fontSize: 24,
  //   paddingVertical: 5,
  // },
  // sectionTitleText: {
  //   color: 'white',
  //   fontSize: 18,
  //   paddingVertical: 5,
  // },
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
      <View style={styles.row}>
        <Text style={styles.name} numberOfLines={1}>
          {`# ${row.get('episodeNumber')}  ${row.get('title')}`}
        </Text>
        <Text style={styles.small}>
          {moment(row.get('airDateUtc')).fromNow()}
        </Text>
        <Text style={styles.small}>
          {row.get('hasFile') ? 'HDTV' : <Icon name="exclamation-triangle" />}
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
            <Icon name="search" />
          </Text>
        </TouchableHighlight>
      </View>
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
          renderRow={(row) => this.renderRow(row)}

          renderScrollComponent={() => (
            <ParallaxScrollView
              onScroll={onScroll}
              backgroundColor="transparent"
              headerBackgroundColor="#333"
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}

              renderBackground={() => (
                <View key="background">
                  <Image
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

              // renderForeground={() => (
              //   <View key="parallax-header" style={ styles.parallaxHeader }>
              //     <Image style={ styles.avatar } source={{
              //       uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
              //       width: AVATAR_SIZE,
              //       height: AVATAR_SIZE
              //     }}/>
              //     <Text style={ styles.sectionSpeakerText }>
              //       Talks by Rich Hickey
              //     </Text>
              //     <Text style={ styles.sectionTitleText }>
              //       CTO of Cognitec, Creator of Clojure
              //     </Text>
              //   </View>
              // )}

              // renderStickyHeader={() => (
              //   <View key="sticky-header" style={styles.stickySection}>
              //     <Text style={styles.stickySectionText}>
              //       {serie.get('title')}
              //     </Text>
              //   </View>
              // )}

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
