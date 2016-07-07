import React, {Component, PropTypes} from 'react';
import {Alert, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getConfig} from '../../actions/config';
import * as apiActions from '../../actions/api';
import {STORAGE_KEY} from '../../constants/variables';
import {BLUE, BORDER_COLOR} from '../../constants/brand';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
  headline: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  label: {
    marginBottom: 5,
    color: 'black',
  },
  textInput: {
    height: 40,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: BLUE,
    borderRadius: 4,
    padding: 20,
    color: 'white',
    textAlign: 'center',
  },

});

class ConfigureApp extends Component {

  static propTypes = {
    config: PropTypes.object,
    pending: PropTypes.bool.isRequired,
    getConfig: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      hostname: '',
      apiKey: '',
    };
  }

  onPressButton() {
    apiActions.setHostname(this.state.hostname);
    apiActions.setApiKey(this.state.apiKey);
    this.props.getConfig().then(({payload}) => {
      if (payload) {
        // save to async storage
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        if (this.props.onSuccess) {
          this.props.onSuccess();
        }
      } else {
        Alert.alert('Error', 'Unable to save, please try again');
      }
    });
  }


  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.headline}>Configure the app <Icon name="rocket" size={24} color={BLUE} /></Text>
        <View>
          <Text style={styles.label}>Sonarr IP address</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(hostname) => this.setState({hostname})}
            value={this.state.hostname}
            placeholder={apiActions.getHostName() || 'http://123.1.2.4:8989'}
          />

          <Text style={styles.label}>Sonarr API key</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(apiKey) => this.setState({apiKey})}
            value={this.state.apiKey}
            placeholder={apiActions.getApiKey() || 'abcd3rdakflk23'}
          />

          <TouchableOpacity onPress={() => this.onPressButton()}>
            <Text style={styles.saveBtn}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const stateToProps = (state) => ({
  config: state.Config.get('config'),
  pending: state.Config.get('pending'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    getConfig,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(ConfigureApp);
