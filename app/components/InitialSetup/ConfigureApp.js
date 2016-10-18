import React, {Component, PropTypes} from 'react';
import {Alert, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getConfig} from '../../actions/config';
import * as apiActions from '../../actions/api';
import {STORAGE_KEY} from '../../constants/variables';
import {BLUE, BORDER_COLOR, RED} from '../../constants/brand';
import Icon from 'react-native-vector-icons/FontAwesome';
import urlRegex from 'url-regex';
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

const withoutAuthStuff = (host) => {
  if (host && host.indexOf('@') > 0) {
    const split = host.split('//');
    const rest = split[1].split('@');
    return `${split[0]}//${rest[1]}`;
  }
  return host;
};

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
    if (!this.state.apiKey) {
      Alert.alert('Error', 'Sonarr API key missing.');
    } else {
      apiActions.setApiKey(this.state.apiKey);
      this.props.getConfig().then(({payload}) => {
        if (payload) {
          // save to async storage
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
          if (this.props.onSuccess) {
            console.log('success');
            this.props.onSuccess(); // TODO hmm not called ?
          }
        } else {
          Alert.alert('Error', 'Unable to save, please try again');
        }
      });
    }
  }

  isValidURL() {
    if (!urlRegex({exact: true}).test(this.state.hostname)) {
      const newUrl = `http://${this.state.hostname}`;
      if (urlRegex({exact: true}).test(newUrl)) {
        this.setState({
          hostname: newUrl,
        });
      } else {
        Alert.alert('Error', 'Invalid URL');
      }
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.headline}>Configure the app <Icon name="rocket" size={24} color={RED} /></Text>
        <View>
          <Text style={styles.label}>Sonarr IP address</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            onEndEditing={() => this.isValidURL()}
            onChangeText={(hostname) => this.setState({hostname})}
            value={this.state.hostname}
            placeholder={withoutAuthStuff(apiActions.getHostName()) || 'http://123.1.2.4:8989'}
          />

          <Text style={styles.label}>Sonarr API key</Text>
          <TextInput
            style={styles.textInput}
            autoCorrect={false}
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
