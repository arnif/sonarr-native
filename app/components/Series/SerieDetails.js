import React, {Component, PropTypes} from 'react';
import {
  // Dimensions,
  ListView,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
// import Accordion from 'react-native-accordion';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getEpisodes, downloadEpisode} from '../../actions/series';
import moment from 'moment';

// const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    // marginTop: 60,
  },
  bannerImage: {
    // flex: 1,
    height: 200,
    // width: 200,
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
    // fetch serie details (seasons etc)
    this.props.getEpisodes(this.props.serie.get('id'));
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
    console.log('row', row);
    return (
      <View style={styles.row}>
        <Text style={styles.name} numberOfLines={1}>
          {`# ${row.get('episodeNumber')}  ${row.get('title')}`}
        </Text>
        <Text style={styles.small}>
          {moment(row.get('airDateUtc')).fromNow()}
        </Text>
        <Text style={styles.small}>
          {row.get('hasFile') ? 'HDTV' : 'Missing'}
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
            Download
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    console.log(this.props);
    const {serie} = this.props;
    const bannerImage = serie.get('images').find((i) => i.get('coverType') === 'fanart').get('url');
    const imageUrl = `http://10.0.1.10:8989${bannerImage}`;
    return (
      <View style={styles.root}>
        <Image source={{uri: imageUrl}} style={styles.bannerImage} resizeMode="cover" />
        {/* <Text>{serie.get('title')}</Text>*/}

        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(row) => this.renderRow(row)}
        />
      </View>
    );
  }
}

const stateToProps = (state) => ({
  episodes: state.Series.get('serieEpisodes'),
  pending: state.Series.get('episodePending'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    getEpisodes,
    downloadEpisode,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SerieDetails);
