import React, {PropTypes} from 'react';
import {Dimensions, View} from 'react-native';

const screen = Dimensions.get('window');
const getPercentageInPixels = (currentValue, total) => {
  let percentage = 0;
  if (currentValue === 0) {
    percentage = 0;
  } else {
    percentage = currentValue / total;
  }
  return screen.width * percentage;
};

const Progressbar = ({currentValue, totalValue}) => {
  const percentageInPixels = getPercentageInPixels(currentValue, totalValue);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#ccc',
        width: screen.width,
        height: 2}}
    >
      <View style={{backgroundColor: '#36c6f4', width: percentageInPixels}} />
    </View>
  );
};

Progressbar.propTypes = {
  currentValue: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default Progressbar;
