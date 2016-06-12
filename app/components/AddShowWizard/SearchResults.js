import React, {Component, PropTypes} from 'react';
import {View, Text, ListView, TouchableHighlight, StyleSheet} from 'react-native';
import {BLUE} from '../../constants/brand';

const styles = StyleSheet.create({
  root: {
    flex: 1,
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

  renderRow(rowData) {
    console.log(rowData);
    return (
      <View>
        <Text>{rowData.get('title')}</Text>
      </View>
    );
  }

  render() {
    if (this.props.results && this.props.results.size === 0) {
      return (
        <View>
          <Text>No results</Text>
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
          enableEmptySections
        />
      </View>
    );
  }
}

export default SearchResults;
