import React, {Component, PropTypes} from 'react';
import {ListView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getSeries} from '../../actions/series';
import SeriesItem from './SeriesItem';
import SerieDetails from './SerieDetails';


class SeriesList extends Component {

  static propTypes = {
    getSeries: PropTypes.func.isRequired,
    series: PropTypes.object,
    pending: PropTypes.bool.isRequired,
    navigator: PropTypes.object.isRequired,
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
      name: serie.get('title'),
      passProps: {
        serie,
      },
    });
  }


  render() {
    const pending = this.props.pending;
    return (
      <ListView
        style={{backgroundColor: 'white', marginTop: 60}}
        dataSource={this.state.dataSource}
        renderRow={(serie) => (
          <SeriesItem
            onPress={() => this.navigate(serie)}
            item={serie}
          />
          )
        }
        enableEmptySections
        // contentInset={{bottom: 64}}
        refreshControl={
          <RefreshControl
            tintColor="black"
            refreshing={pending}
            onRefresh={this.props.getSeries}
          />
        }
      />
    );
  }
}

const stateToProps = (state) => ({series: state.Series.get('series'), pending: state.Series.get('pending')});

const dispatchToProps = (dispatch) => {
  const actions = {
    getSeries,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(SeriesList);
