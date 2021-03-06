import React, {Component, PropTypes} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  View,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {searchReleases, downloadRelease, clearReleases} from '../../../actions/search';
import {hideModal} from '../../../actions/modal';
import {BACKGROUND_GRAY, BORDER_COLOR, TEXT_GRAY, GREEN, GREEN_BORDER, YELLOW} from '../../../constants/brand';
import {humanFileSize} from '../../../helpers/utilities';
import Label from '../../Widgets/Label';
import EmptyState from '../../Widgets/EmptyState';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  listView: {
    backgroundColor: BACKGROUND_GRAY,
  },
  row: {
    padding: 5,
    borderTopWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: 'white',
  },
  small: {
    fontSize: 12,
    color: TEXT_GRAY,
  },

  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondLine: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  thirdLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fileName: {
    width: screen.width - 45,
  },
  button: {
    padding: 8,
    borderRadius: 3,
    backgroundColor: GREEN,
    alignSelf: 'center',
  },
});

class EpisodeSearch extends Component {
  static propTypes = {
    searchReleases: PropTypes.func.isRequired,
    downloadRelease: PropTypes.func.isRequired,
    episode: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    episodeReleases: PropTypes.object,
    hideModal: PropTypes.func.isRequired,
    clearReleases: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([]),
    };
  }

  componentWillMount() {
    this.props.searchReleases(this.props.episode.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.getRows(nextProps)),
    });
  }

  componentWillUnmount() {
    this.props.clearReleases();
  }

  getRows(props) {
    const {episodeReleases} = props;
    let rows = [];
    if (episodeReleases !== null) {
      rows = episodeReleases.toArray();
    }
    return rows;
  }

  render() {
    const {pending, episodeReleases} = this.props;
    // TODO fix days old (could be hrs or min even years ???)
    // TODO show rejected reason if there is any...
    return (
      <View style={{flex: 1}}>
        {episodeReleases && episodeReleases.size === 0 &&
          <EmptyState text="No results" viewStyle={{marginTop: 0}} />
        }
        {pending &&
          <ActivityIndicator
            animating={pending}
            style={{
              height: 80,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            color="black"
            size="large"
          />
        }

        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={(file) => (
            <View style={styles.row}>
              <View style={styles.firstLine}>
                <Label text={file.get('protocol')} />
                <Text style={styles.small}>
                  {moment().diff(file.get('publishDate'), 'days')} days old
                </Text>
                <Text style={styles.small}>
                  {humanFileSize(file.get('size'))}
                </Text>
              </View>
              <View style={styles.secondLine}>
                <Text style={styles.fileName}>{file.get('title')}</Text>
                <TouchableHighlight
                  style={styles.button}
                  underlayColor={GREEN_BORDER}
                  onPress={() => {
                    this.props.downloadRelease(file.toJS());
                    this.props.hideModal();
                  }
                  }
                >
                  <Text>
                    <Icon name="download" color="white" size={20} />
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.thirdLine}>
                <Label text={file.getIn(['quality', 'quality', 'name'])} />
                <Text style={styles.small}>{file.get('indexer')}</Text>
                <Label text={`${file.get('seeders')}/${file.get('leechers')}`} color={YELLOW} />
              </View>
            </View>
            )
          }
        />
      </View>
    );
  }
}

const dispatchToProps = (dispatch) => {
  const actions = {
    searchReleases,
    downloadRelease,
    hideModal,
    clearReleases,
  };
  return bindActionCreators(actions, dispatch);
};

const stateToProps = (state) => ({
  episodeReleases: state.Search.get('episodeReleases'),
  pending: state.Search.get('episodeReleasesPending'),
});

export default connect(stateToProps, dispatchToProps)(EpisodeSearch);
