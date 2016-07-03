import React, {Component, PropTypes} from 'react';
import {ListView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getSeries} from '../../actions/series';
import {BORDER_COLOR, BACKGROUND_GRAY} from '../../constants/brand';
import {NAV_HEIGHT} from '../../constants/variables';
import SeriesItem from './SeriesItem';
import SerieDetails from './SerieDetails';
import EmptyState from '../Widgets/EmptyState';


class SeriesList extends Component {

  static propTypes = {
    getSeries: PropTypes.func.isRequired,
    series: PropTypes.object,
    pending: PropTypes.bool.isRequired,
    navigator: PropTypes.object.isRequired,
    profile: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([]),
    };
  }

  componentDidMount() {
    this.props.getSeries();
  }

  componentWillReceiveProps(nextProps) {
    const series = nextProps.series;
    let rows = [];
    if (series !== null) {
      rows = series.toArray();
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(rows),
    });
  }

  navigate(serie) {
    this.props.navigator.push({
      component: SerieDetails,
      index: 1,
      name: serie.get('title'),
      passProps: {
        serieId: serie.get('id'),
      },
    });
  }


  render() {
    const {pending, profile} = this.props;
    if (!profile) {
      return null;
    }
    if (this.props.series && this.props.series.size === 0) {
      return (
        <EmptyState
          text="You must be new around here, You should add some series."
        />
      );
    }
    return (
      <ListView
        style={{backgroundColor: BACKGROUND_GRAY, marginTop: NAV_HEIGHT - 1}}
        dataSource={this.state.dataSource}
        renderRow={(serie) => (
          <SeriesItem
            onPress={() => this.navigate(serie)}
            item={serie}
            profile={profile}
          />
          )
        }
        enableEmptySections
        refreshControl={
          <RefreshControl
            tintColor={BORDER_COLOR}
            refreshing={pending}
            onRefresh={this.props.getSeries}
          />
        }
      />
    );
  }
}

const stateToProps = (state) => ({
  series: state.Series.get('series'),
  pending: state.Series.get('pending'),
  profile: state.Config.get('profile'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    getSeries,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SeriesList);
