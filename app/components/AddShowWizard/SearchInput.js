import React, {Component, PropTypes} from 'react';
import {View, Text, TextInput, TouchableHighlight, StyleSheet} from 'react-native';
import debounce from 'lodash.debounce';
import {BLUE, BORDER_COLOR, BACKGROUND_GRAY} from '../../constants/brand';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: BACKGROUND_GRAY,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  searchInput: {
    flex: 4,
    padding: 10,
    borderColor: BORDER_COLOR,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
  },
  button: {
    flex: 1,
    padding: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: BLUE,
  },
});


class SearchInput extends Component {

  static propTypes = {
    lookup: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    resultSize: PropTypes.number.isRequired,
  }

  constructor() {
    super();
    this.state = {
      text: '',
    };
    this.search = debounce(this.search, 500);
  }

  search() {
    console.log('search', this.state.text);
    this.props.lookup(this.state.text);
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.root}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => {
            this.setState({text});
            this.search(text);
          }}
          value={this.state.text}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          clearButtonMode="while-editing"
          placeholder="Name of the series you want to add..."
          returnKeyType="search"
          onSubmitEditing={() => this.search()}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor="transparent"
          onPress={() => this.props.hideModal()}
        >
          <Text style={styles.buttonText}>
            Cancel
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SearchInput;
