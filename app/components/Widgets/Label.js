import React, {PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Label = ({text, color = '#777777'}) => {
  const styles = StyleSheet.create({
    root: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 4,
      paddingRight: 4,
      backgroundColor: color,
      borderRadius: 4,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 12,
      color: 'white',
    },
  });
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  );
};


Label.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Label;
