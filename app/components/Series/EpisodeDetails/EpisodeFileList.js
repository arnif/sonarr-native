import React, {Component, PropTypes} from 'react';
import {Alert, ListView, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deleteEpisodeFromFile, getEpisodes, getEpisodesFiles} from '../../../actions/series';
import {RED} from '../../../constants/brand';
import {humanFileSize} from '../../../helpers/utilities';
import Label from '../../Widgets/Label';

const styles = StyleSheet.create({
  trHead: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  label: {
    alignSelf: 'flex-start',
  },
  close: {
    padding: 5,
    backgroundColor: RED,
    borderRadius: 3,
    flex: 1,
    alignSelf: 'flex-start',
  },
});

class EpisodeFileList extends Component {

  static propTypes = {
    episodeFiles: PropTypes.object.isRequired,
    deleteEpisodeFromFile: PropTypes.func.isRequired,
    getEpisodes: PropTypes.func.isRequired,
    getEpisodesFiles: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows(this.getRows(this.props)),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.getRows(nextProps)),
    });
  }

  async onDelete(file) {
    await this.props.deleteEpisodeFromFile(file.id);
    this.props.getEpisodes(file.seriesId);
    this.props.getEpisodesFiles(file.seriesId);
  }

  getRows(props) {
    const {episodeFiles} = props;
    let rows = [];
    if (episodeFiles !== null) {
      rows = [episodeFiles];
    }
    return rows;
  }

  showConfirmDialog(file) {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete '${file.path}' from disk?`,
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'Yes', onPress: () => this.onDelete(file)},
      ]
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        scrollEnabled={false}
        enableEmptySections
        renderRow={(file) => (
          <View>
            <Text style={styles.trHead}>Path</Text>
            <Text>{file.path}</Text>
            <Text style={styles.trHead}>Size</Text>
            <Text>{humanFileSize(file.size)}</Text>
            <Text style={styles.trHead}>Quality</Text>
            <Label
              style={styles.label}
              text={file.quality.quality.name}
              invert={file.qualityCutoffNotMet}
            />
            <Text style={styles.trHead}>Delete</Text>
            <TouchableHighlight
              style={styles.close}
              underlayColor="transparent"
              onPress={() => this.showConfirmDialog(file)}
            >
              <Icon name="close" size={20} color="white" />
            </TouchableHighlight>
          </View>
          )
        }
      />
    );
  }
}


const dispatchToProps = (dispatch) => {
  const actions = {
    deleteEpisodeFromFile,
    getEpisodes,
    getEpisodesFiles,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(null, dispatchToProps)(EpisodeFileList);
