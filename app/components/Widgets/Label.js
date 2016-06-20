import React, {PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Label = ({text, color = '#777777', style, textStyle, invert = false}) => {
  if (!text) {
    return null;
  }
  const styles = StyleSheet.create({
    root: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 4,
      paddingRight: 4,
      backgroundColor: invert ? '#eee' : color,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: color,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 10,
      color: invert ? color : 'white',
      textAlign: 'center',
    },
  });
  return (
    <View style={[styles.root, style]}>
      <Text style={[styles.text, textStyle]}>
        {text}
      </Text>
    </View>
  );
};


Label.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  invert: PropTypes.bool,
};

export default Label;
