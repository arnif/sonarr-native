import React, {Component, PropTypes} from 'react';
import {ActivityIndicatorIOS, View, Text, ListView, StyleSheet} from 'react-native';
import {BORDER_COLOR} from '../../constants/brand';
import SearchResultsItem from './SearchResultsItem';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: -1,
  },
  emptyWrapper: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: BORDER_COLOR,
  },
  loadingWrapper: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
});


class SearchResults extends Component {

  static propTypes = {
    pending: PropTypes.bool.isRequired,
    results: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    const series = nextProps.results;
    let rows = [];
    if (series !== null) {
      rows = series.toArray();
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(rows),
    });
  }

  render() {
    console.log(this.props.results);
    if (!this.props.results) {
      return (
        <View style={styles.emptyWrapper}>
          <Text style={styles.emptyText}>Start typing to search...</Text>
        </View>
      );
    }
    if (this.props.results && this.props.results.size === 0) {
      return (
        <View style={styles.emptyWrapper}>
          <Text style={styles.emptyText}>No results</Text>
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <SearchResultsItem item={rowData} />}
          enableEmptySections
          renderFooter={() => (
            <View style={styles.loadingWrapper}>
              <ActivityIndicatorIOS
                animating={this.props.pending}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

export default SearchResults;
