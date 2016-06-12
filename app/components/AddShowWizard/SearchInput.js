import React, {Component, PropTypes} from 'react';
import {View, Text, TextInput, TouchableHighlight, StyleSheet} from 'react-native';
import {BLUE} from '../../constants/brand';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  searchInputWrapper: {

  },
  searchInput: {
    flex: 4,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  button: {
    flex: 1,
    backgroundColor: BLUE,
    padding: 5,
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});


class SearchInput extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={styles.root}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight style={styles.button} underlayColor="transparent">
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SearchInput;
