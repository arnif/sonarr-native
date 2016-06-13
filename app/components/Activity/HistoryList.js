import React, {Component, PropTypes} from 'react';
import {
  // View,
  ListView,
  // Text,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHistory} from '../../actions/activity';
import {BORDER_COLOR, BACKGROUND_GRAY} from '../../constants/brand';
import HistoryItem from './HistoryItem';
import SerieDetails from '../Series/SerieDetails';


class HistoryList extends Component {

  static propTypes = {
    getHistory: PropTypes.func.isRequired,
    history: PropTypes.object,
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

  componentWillMount() {
    // get history
    this.props.getHistory();
  }

  componentWillReceiveProps(nextProps) {
    const history = nextProps.history;
    let rows = [];
    if (history !== null) {
      rows = history.get('records').toArray();
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(rows),
    });
  }

  navigate(serie) {
    console.log('serie', serie);
    this.props.navigator.push({
      component: SerieDetails,
      index: 1,
      name: serie.getIn(['series', 'title']),
      passProps: {
        serieId: serie.getIn(['series', 'id']),
      },
    });
  }


  render() {
    const pending = this.props.pending;
    return (
      <ListView
        style={{backgroundColor: BACKGROUND_GRAY, marginTop: 59}}
        dataSource={this.state.dataSource}
        renderRow={(item) => (
          <HistoryItem item={item} onPress={() => this.navigate(item)} />
          )
        }
        enableEmptySections
        refreshControl={
          <RefreshControl
            tintColor={BORDER_COLOR}
            refreshing={pending}
            onRefresh={this.props.getHistory}
          />
        }
      />
    );
  }
}

const stateToProps = (state) => ({
  history: state.Activity.get('history'),
  pending: state.Activity.get('pending'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    getHistory,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(HistoryList);
