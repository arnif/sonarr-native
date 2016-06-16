import React, {Component, PropTypes} from 'react';
import {View, Text, Modal, Picker, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#F5FCFF',
  },
  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomPicker: {
    width: SCREEN_WIDTH,
  },
});

export default class BottomPicker extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    pickerItems: PropTypes.object.isRequired,
    selectedItem: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.selectedItem,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     selectedValue: nextProps.selectedItem,
  //   });
  // }

  getSelcetedItem(id) {
    return this.props.pickerItems.find((item) => item.get('id') === id) || id;
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent
      >
        <View style={styles.basicContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={() => this.props.onCancel()}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.onSubmit(this.getSelcetedItem(this.state.selectedValue))}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainBox}>
              <Picker
                style={styles.bottomPicker}
                selectedValue={this.state.selectedValue}
                onValueChange={(selectedValue) => this.setState({selectedValue})}
              >
              {this.props.pickerItems.map((pickerItem) => (
                <Picker.Item
                  key={pickerItem.get('id')}
                  label={pickerItem.get('name') || pickerItem.get('path')}
                  value={pickerItem.get('id')}
                />
              ))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
