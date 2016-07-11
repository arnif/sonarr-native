import React, {PropTypes, Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {showModal} from '../../actions/modal';
import {showFilter, hideFilter, sortSeries} from '../../actions/series';
import SeriesList from '../Series/SeriesList';
import NavigatorWrapper from './NavigatorWrapper';
import AddShowWizardWrapper from '../AddShowWizard/AddShowWizardWrapper';
import {bindActionCreators} from 'redux';
import BottomPicker from '../Widgets/BottomPicker';
import {SERIES_FILTER} from '../../constants/variables';

class SeriesNavigation extends Component {

  constructor() {
    super();
    this.state = {
      selectedFilter: SERIES_FILTER.get(0),
    };
  }

  render() {
    const initialRoute = {
      name: 'Series',
      index: 0,
      component: SeriesList,
      onPress: () => { this.props.showModal(<AddShowWizardWrapper />); },
      onLeftPress: () => { this.props.showFilter(); },
      rightText: 'Add',
      leftText: 'Filter',
    };

    return (
      <View style={{flex: 1}}>
        {this.props.showFilterPicker &&
          <BottomPicker
            pickerItems={SERIES_FILTER}
            selectedItem={this.state.selectedFilter}
            onSubmit={(value) => {
              this.props.sortSeries(value.get('param'));
              this.props.hideFilter();
              this.setState({selectedFilter: value});
            }}
            onCancel={() => {
              this.props.hideFilter();
            }}
          />
        }
        <NavigatorWrapper initialRoute={initialRoute} />
      </View>
    );
  }
}

SeriesNavigation.propTypes = {
  showModal: PropTypes.func.isRequired,
  showFilter: PropTypes.func.isRequired,
  hideFilter: PropTypes.func.isRequired,
  showFilterPicker: PropTypes.bool.isRequired,
  sortSeries: PropTypes.func.isRequired,
};

const stateToProps = (state) => ({
  showFilterPicker: state.Series.get('showFilter'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    showModal,
    showFilter,
    hideFilter,
    sortSeries,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SeriesNavigation);
