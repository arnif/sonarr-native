import React, {Component} from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import codePush, {InstallMode} from 'react-native-code-push';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {getSeries} from './actions/series';
import SeriesList from './components/Series/SeriesList';
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
    };
  }

  componentDidMount() {
    // todo
  }


  render() {
    return (
      <SeriesList />
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
