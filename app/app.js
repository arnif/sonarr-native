import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native';
// import codePush, {InstallMode} from 'react-native-code-push';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {getSeries} from './actions/series';
import * as apiActions from './actions/api';
import {STORAGE_KEY} from './constants/variables';
// import SeriesList from './components/Series/SeriesList';
import Navigation from './components/Navigation/Navigation';
import ConfigureApp from './components/InitialSetup/ConfigureApp';

import Immutable from 'immutable';
import installDevTools from 'immutable-devtools'; // TODO remove from production !!
installDevTools(Immutable); // TODO remove from production !!

class App extends Component {

  static propTypes = {
    // getSeries: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      initialLoad: true,
      keyFound: false,
    };
  }

  componentDidMount() {
      // this.setState({initialLoad: false}); // eslint-disable-line
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      console.log(STORAGE_KEY);
      this.setState({initialLoad: false}); // eslint-disable-line
      if (data) {
        const {hostname, apiKey} = JSON.parse(data);
        apiActions.setHostname(hostname);
        apiActions.setApiKey(apiKey);
        this.setState({keyFound: true}); // eslint-disable-line
      }
    });
  }


  render() {
    if (this.state.initialLoad && !this.state.keyFound) {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}} />
      );
    }

    if (!this.state.keyFound && !this.state.initialLoad) {
      return (
        <ConfigureApp />
      );
    }
    return (
      <Navigation />
    );
  }
}

// const stateToProps = (state) => ({Series: state.Series});
//
// const dispatchToProps = (dispatch) => {
//   const actions = {
//     getSeries,
//   };
//   return bindActionCreators(actions, dispatch);
// };

// export default connect(stateToProps, dispatchToProps)(App);
export default App;
