import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {lookup} from '../../actions/search';
import {BORDER_COLOR, TEXT_GRAY, RED} from '../../constants/brand';
import {MONITOR_ITEMS, SERIES_TYPES} from '../../constants/variables';
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
};

class SearchResultsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfilePicker: false,
      showPathPicker: false,
      showMonitorPicker: false,
      showSeriesTypePicker: false,
      selectedProfile: props.profile.get(0),
      selectedMonitor: MONITOR_ITEMS.get(0),
      selectedSeriesType: SERIES_TYPES.get(0),
      selectedPath: props.rootFolder.get(0),
    };
  }
  render() {
    const {item, profile, rootFolder} = this.props;
    console.log(rootFolder);
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
            selectedItem={this.state.selectedProfile}
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
};

const stateToProps = (state) => ({
  profile: state.Config.get('profile'),
  rootFolder: state.Config.get('rootFolder'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SearchResultsItem);
