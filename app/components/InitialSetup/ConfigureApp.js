import React, {Component, PropTypes} from 'react';
import {Alert, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getConfig} from '../../actions/config';
import * as apiActions from '../../actions/api';
import {STORAGE_KEY} from '../../constants/variables';

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
    borderColor: 'gray',
    borderWidth: 1,
    padding: 4,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: 'lightblue',
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
  }

  constructor(props) {
    super(props);
    this.state = {
      hostname: '',
      apiKey: '',
    };
  }

  async onPressButton() {
    apiActions.setHostname(this.state.hostname);
    apiActions.setApiKey(this.state.apiKey);
    const {payload} = await this.props.getConfig();
    if (payload) {
      // save to async storage
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } else {
      Alert.alert('Error', 'Unable to save, please try again');
    }
  }


  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.headline}>Configure the app</Text>
        <View>
          <Text style={styles.label}>Sonarr IP address</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(hostname) => this.setState({hostname})}
            value={this.state.hostname || apiActions.getHostName()}
            placeholder="http://123.1.2.4:8989"
          />

          <Text style={styles.label}>Sonarr API key</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(apiKey) => this.setState({apiKey})}
            value={this.state.apiKey || apiActions.getApiKey()}
            placeholder="abcd3rdakflk23"
          />

          <TouchableHighlight onPress={() => this.onPressButton()}>
            <Text style={styles.saveBtn}>Save</Text>
          </TouchableHighlight>
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
