import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as apiActions from '../../actions/api';
import {STORAGE_KEY} from '../../constants/variables';
import {BLUE, BORDER_COLOR} from '../../constants/brand';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
  headline: {
    alignSelf: 'center',
    marginBottom: 40,
    textAlign: 'center',
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

class AuthenticationPrompt extends Component {

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  onPressButton() {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      console.log('AsyncStorage', STORAGE_KEY, data);
      if (data) {
        apiActions.addBrowserAuthToHostname(this.state.username, this.state.password);
        const {apiKey} = JSON.parse(data);
        const newData = {
          hostname: apiActions.getHostName(),
          apiKey,
        };
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        this.props.onSuccess();
      }
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.headline}>To be able to view Images you need to provide username and password</Text>
        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry
          />

          <TouchableOpacity onPress={() => this.onPressButton()}>
            <Text style={styles.saveBtn}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AuthenticationPrompt;
