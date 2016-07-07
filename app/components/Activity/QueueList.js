import React, {Component, PropTypes} from 'react';
import {
  ListView,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getQueue} from '../../actions/activity';
import {BORDER_COLOR, BACKGROUND_GRAY} from '../../constants/brand';
import HistoryItem from './HistoryItem';
import SerieDetails from '../Series/SerieDetails';
import EmptyState from '../Widgets/EmptyState';


class QueueList extends Component {

  static propTypes = {
    getQueue: PropTypes.func.isRequired,
    queue: PropTypes.object,
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
    // get queue
    this.props.getQueue();
  }

  componentWillReceiveProps(nextProps) {
    const queue = nextProps.queue;
    let rows = [];
    if (queue !== null) {
      rows = queue.toArray();
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(rows),
    });
  }

  navigate(serie) {
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
    if (this.props.queue && this.props.queue.size === 0) {
      return (
        <EmptyState text="Queue is empty" viewStyle={{marginTop: 100}} />
      );
    }
    return (
      <ListView
        style={{backgroundColor: BACKGROUND_GRAY}}
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
            onRefresh={this.props.getQueue}
          />
        }
      />
    );
  }
}

const stateToProps = (state) => ({
  queue: state.Activity.get('queue'),
  pending: state.Activity.get('pending'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    getQueue,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(QueueList);
