import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addSerie, getSeries} from '../../actions/series';
import {hideModal} from '../../actions/modal';
import {BORDER_COLOR, TEXT_GRAY, RED, GREEN, GREEN_BORDER} from '../../constants/brand';
import {MONITOR_ITEMS, SERIES_TYPES} from '../../constants/variables';
import {getAddOptions} from '../../helpers/addShowHelper';
import Label from '../Widgets/Label';
import SmartImage from '../Widgets/SmartImage';
import BottomPicker from '../Widgets/BottomPicker';

const styles = {
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    marginTop: -1,
  },
  posterImage: {
    width: 80,
    height: 120,
    marginRight: 20,
    borderRadius: 3,
  },
  textWrapper: {
    flex: 1,
  },
  labelWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  label: {
    marginRight: 5,
  },
  year: {
    color: TEXT_GRAY,
    fontStyle: 'italic',
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

  addButtonsWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  addButton: {
    backgroundColor: GREEN,
    padding: 14,
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

class SearchResultsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfilePicker: false,
      showPathPicker: false,
      showMonitorPicker: false,
      showSeriesTypePicker: false,
      isSeasonfolder: false,
      selectedProfile: props.profile.get(0),
      selectedMonitor: MONITOR_ITEMS.get(0),
      selectedSeriesType: SERIES_TYPES.get(0),
      selectedPath: props.rootFolder.get(0),
    };
  }

  async handleAddSeries(shouldSearch) {
    console.log('shouldSearch', shouldSearch);
    const seasons = this.props.item.get('seasons');
    const addOptions = getAddOptions(this.state.selectedMonitor.get('id'), seasons, shouldSearch);
    const addedData = {
      ...this.props.item.toJS(),
      rootFolderPath: this.state.selectedPath.get('path'),
      seriesType: this.state.selectedSeriesType.get('name').toLowerCase(),
      profileId: this.state.selectedProfile.get('id'),
      qualityProfileId: this.state.selectedProfile.get('id'),
      seasonFolder: this.state.isSeasonfolder,
      ...addOptions,
    };
    await this.props.addSerie(addedData);
    await this.props.getSeries();
    this.props.hideModal();
  }

  render() {
    console.log(this.props);
    const {item, profile, rootFolder} = this.props;
    const hasEnded = item.get('status') === 'ended';
    return (
      <View style={styles.row}>
        <SmartImage item={item} style={styles.posterImage} type="poster" />
        <View style={styles.textWrapper}>
          <Text>
            {item.get('title')}
            <Text style={styles.year}> ({item.get('year')})</Text>
          </Text>
          <View style={styles.labelWrapper}>
            <Label text={item.get('network')} style={styles.label} />
            {hasEnded &&
              <Label text="Ended" color={RED} />
            }

          </View>
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
              onPress={() => this.setState({showPathPicker: true})}
            >
              <View style={styles.pickerButtonView}>
                <Text style={styles.pickerButtonText}>
                  {this.state.selectedPath.get('path')}
                </Text>
                <Icon name="chevron-down" size={12} color="#B9B9B9" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerButtonWrapper}
              onPress={() => this.setState({showMonitorPicker: true})}
            >
              <View style={styles.pickerButtonView}>
                <Text style={styles.pickerButtonText}>
                  {this.state.selectedMonitor.get('name')}
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


            </View>
            <View style={styles.addButtonsWrapper}>
              <TouchableOpacity
                style={[styles.addButton, styles.leftButton]}
                onPress={() => this.handleAddSeries()}
              >
                <Text>
                  <Icon name="plus" color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addButton, styles.rightButton]}
                onPress={() => this.handleAddSeries(true)}
              >
                <Text>
                  <Icon name="search" color="white" />
                </Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>

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

        {this.state.showMonitorPicker &&
          <BottomPicker
            onSubmit={(value) => this.setState({
              showMonitorPicker: false,
              selectedMonitor: value,
            })}
            onCancel={() => this.setState({showMonitorPicker: false})}
            pickerItems={MONITOR_ITEMS}
            selectedItem={this.state.selectedMonitor}
          />
        }
      </View>
    );
  }
}

SearchResultsItem.propTypes = {
  item: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  rootFolder: PropTypes.object.isRequired,
  addSerie: PropTypes.func.isRequired,
  getSeries: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const stateToProps = (state) => ({
  profile: state.Config.get('profile'),
  rootFolder: state.Config.get('rootFolder'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    addSerie,
    getSeries,
    hideModal,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SearchResultsItem);
