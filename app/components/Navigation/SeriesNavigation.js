import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/modal';
import SeriesList from '../Series/SeriesList';
import NavigatorWrapper from './NavigatorWrapper';
import AddShowWizardWrapper from '../AddShowWizard/AddShowWizardWrapper';


const SeriesNavigation = ({showModal}) => {
  const initialRoute = {
    name: 'Series',
    index: 0,
    component: SeriesList,
    onPress: () => { showModal(<AddShowWizardWrapper />); },
    rightText: 'Add',
  };
  return (
    <NavigatorWrapper initialRoute={initialRoute} />
  );
};

SeriesNavigation.propTypes = {
  showModal: PropTypes.func.isRequired,
};


export default connect(null, actionCreators)(SeriesNavigation);
