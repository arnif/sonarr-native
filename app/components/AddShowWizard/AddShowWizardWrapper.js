import React from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {lookup} from '../../actions/search';
import {hideModal} from '../../actions/modal';
import {BACKGROUND_GRAY} from '../../constants/brand';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const AddShowWizardWrapper = ({lookup, results, pending, hideModal}) => { // eslint-disable-line
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={BACKGROUND_GRAY}
        hidden
        animated
      />
      <SearchInput lookup={lookup} pending={pending} hideModal={hideModal} resultSize={results && results.size || 0} />
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
    hideModal,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(AddShowWizardWrapper);
