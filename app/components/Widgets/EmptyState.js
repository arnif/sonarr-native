import React, {PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BORDER_COLOR} from '../../constants/brand';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    color: BORDER_COLOR,
  },
});

const EmptyState = ({textStyle, viewStyle, text}) => (
  <View style={[styles.root, viewStyle]}>
    <Text style={[styles.text, textStyle]}>
      {text}
    </Text>
  </View>
);

EmptyState.propTypes = {
  textStyle: PropTypes.any,
  viewStyle: PropTypes.any,
  text: PropTypes.string.isRequired,
};

export default EmptyState;
