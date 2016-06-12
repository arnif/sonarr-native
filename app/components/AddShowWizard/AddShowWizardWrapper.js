import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {lookup} from '../../actions/search';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const AddShowWizardWrapper = ({lookup, results, pending}) => { // eslint-disable-line
  return (
    <View>
      <SearchInput lookup={lookup} pending={pending} />
      <SearchResults pending={pending} results={results} />
    </View>
  );
};

const stateToProps = (state) => ({
  results: state.Search.get('searchResults'),
  pending: state.Search.get('pending'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    lookup,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(AddShowWizardWrapper);
