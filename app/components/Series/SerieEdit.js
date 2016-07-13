import React, {Component, PropTypes} from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Switch,
  TouchableHighlight,
  InteractionManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
import {editSeries, getSeries, deleteSeries} from '../../actions/series';
import {hideModal} from '../../actions/modal';
import {BORDER_COLOR, RED, GREEN, GREEN_BORDER} from '../../constants/brand';
import {SERIES_TYPES} from '../../constants/variables';
import SmartImage from '../Widgets/SmartImage';
import BottomPicker from '../Widgets/BottomPicker';

const styles = {
  root: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  posterImage: {
    width: 80,
    height: 120,
    marginRight: 20,
    borderRadius: 3,
  },
  pickerButtons: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  pickerButtonWrapper: {
    paddingVertical: 2,
    paddingLeft: 7,
    paddingRight: 7,
    marginTop: 7,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 4,
  },
  pickerButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerButtonText: {
    marginRight: 5,
  },
  bottomButtonsWrapper: {
    marginTop: 7,
  },

  buttonsWrapper: {
    flexDirection: 'row',
  },

  button: {
    backgroundColor: GREEN,
    padding: 14,
  },

  buttonText: {
    color: 'white',
  },

  cancelButton: {
    backgroundColor: '#c0c0c0',
  },

  deleteButton: {
    backgroundColor: RED,
    borderRadius: 4,
  },

  rightButton: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderLeftWidth: 1,
    borderColor: GREEN_BORDER,
  },
  leftButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
};

class SerieEdit extends Component {
  constructor(props) {
    super(props);
    const {serie} = props;
    this.state = {
      showProfilePicker: false,
      showPathPicker: false,
      showMonitorPicker: false,
      showSeriesTypePicker: false,
      isSeasonfolder: serie.seasonFolder,
      isMonitored: serie.monitored,
      selectedProfile: props.profile.find(p => p.get('id') === serie.qualityProfileId) || props.profile.get(0),
      selectedSeriesType: SERIES_TYPES.find(s =>
        s.get('name').toLowerCase() === serie.seriesType
      ) || SERIES_TYPES.get(0),
      selectedPath: props.rootFolder.get(0),
    };
  }

  async handleEditSeries() {
    const addedData = {
      ...this.props.serie,
      seriesType: this.state.selectedSeriesType.get('name').toLowerCase(),
      profileId: this.state.selectedProfile.get('id'),
      qualityProfileId: this.state.selectedProfile.get('id'),
      seasonFolder: this.state.isSeasonfolder,
      monitored: this.state.isMonitored,
    };
    await this.props.editSeries(this.props.serie.id, addedData);
    await this.props.getSeries();
    this.props.hideModal();
  }

  showDeleteConfirm() {
    Alert.alert(
      `Delete ${this.props.serie.title}`,
      this.props.serie.path,
      [
        {text: 'Yes', onPress: () => this.deleteSeries(false)},
        {
          text: `Yes, Delete (${this.props.serie.episodeFileCount}) files`,
          onPress: () => this.deleteSeries(true),
        },
        {text: 'No', onPress: () => {}, style: 'cancel'},
      ]
    );
  }

  async deleteSeries(deleteFiles) {
    await this.props.deleteSeries(this.props.serie.id, deleteFiles);
    this.props.navigator.popToTop(0);
    InteractionManager.runAfterInteractions(() => {
      this.props.hideModal();
      this.props.getSeries();
    });
  }

  renderBottomPickers() {
    const {profile, rootFolder} = this.props;
    return (
      <View>
        {this.state.showProfilePicker &&
          <BottomPicker
            onSubmit={(value) => this.setState({
              showProfilePicker: false,
              selectedProfile: value,
            })}
            onCancel={() => this.setState({showProfilePicker: false})}
            pickerItems={profile}
            selectedItem={this.state.selectedProfile}
          />
        }

        {this.state.showPathPicker &&
          <BottomPicker
            onSubmit={(value) => this.setState({
              showPathPicker: false,
              selectedPath: value,
            })}
            onCancel={() => this.setState({showPathPicker: false})}
            pickerItems={rootFolder}
            selectedItem={this.state.selectedPath}
          />
        }

        {this.state.showSeriesTypePicker &&
          <BottomPicker
            onSubmit={(value) => this.setState({
              showSeriesTypePicker: false,
              selectedSeriesType: value,
            })}
            onCancel={() => this.setState({showSeriesTypePicker: false})}
            pickerItems={SERIES_TYPES}
            selectedItem={this.state.selectedSeriesType}
          />
        }
      </View>
    );
  }

  render() {
    const {serie} = this.props;
    return (
      <View style={styles.root}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableHighlight underlayColor="transparent" onPress={this.props.hideModal}>
            <Icon name="close" size={22} color="#B9B9B9" />
          </TouchableHighlight>
        </View>
        <View>
          <Text style={{alignSelf: 'center', marginBottom: 20, fontSize: 16}}>
            Edit {serie.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <SmartImage item={fromJS(serie)} style={styles.posterImage} type="poster" />
            <View style={{flexDirection: 'column'}}>
              <View style={styles.pickerButtons}>
                <TouchableOpacity
                  style={styles.pickerButtonWrapper}
                  onPress={() => this.setState({showProfilePicker: true})}
                >
                  <View style={styles.pickerButtonView}>
                    <Text style={styles.pickerButtonText}>
                      {this.state.selectedProfile.get('name')}
                    </Text>
                    <Icon name="chevron-down" size={12} color="#B9B9B9" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.pickerButtonWrapper}
                  onPress={() => this.setState({showSeriesTypePicker: true})}
                >
                  <View style={styles.pickerButtonView}>
                    <Text style={styles.pickerButtonText}>
                      {this.state.selectedSeriesType.get('name')}
                    </Text>
                    <Icon name="chevron-down" size={12} color="#B9B9B9" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomButtonsWrapper}>
                <View>
                  <Text>
                    Season Folders
                  </Text>
                  <Switch
                    onValueChange={(value) => this.setState({isSeasonfolder: value})}
                    value={this.state.isSeasonfolder}
                  />
                </View>
                <View>
                  <Text>
                    Monitored
                  </Text>
                  <Switch
                    onValueChange={(value) => this.setState({isMonitored: value})}
                    value={this.state.isMonitored}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => this.showDeleteConfirm()}
              >
                <Text style={styles.buttonText}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                style={[styles.button, styles.leftButton, styles.cancelButton]}
                onPress={() => this.props.hideModal()}
              >
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rightButton]}
                onPress={() => this.handleEditSeries()}
              >
                <Text style={styles.buttonText}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {this.renderBottomPickers()}
      </View>
    );
  }
}

SerieEdit.propTypes = {
  serie: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  rootFolder: PropTypes.object.isRequired,
  editSeries: PropTypes.func.isRequired,
  getSeries: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  deleteSeries: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

const stateToProps = (state) => ({
  profile: state.Config.get('profile'),
  rootFolder: state.Config.get('rootFolder'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    editSeries,
    getSeries,
    hideModal,
    deleteSeries,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SerieEdit);
