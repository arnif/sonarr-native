import React, {PropTypes} from 'react';
import {
  // Dimensions,
  // Image,
  View,
  StyleSheet,
  Text,
  // TouchableHighlight,
} from 'react-native';
// import moment from 'moment';

// const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 65,
  },
  // posterImage: {
  //   width: 80,
  //   height: 120,
  //   marginRight: 20,
  // },
  // textWrapper: {
  //   width: screen.width / 2,
  // },
  // labelWrapper: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  // },
  // label: {
  // },
  // end: {
  //   alignItems: 'flex-end',
  // },
});


const SerieDetails = ({serie}) => { // eslint-disable-line
  // const posterImage = item.get('images').find((i) => i.get('coverType') === 'poster').get('url');
  // const imageUrl = `http://10.0.1.10:8989${posterImage}`;
  // const nextAiring = item.get('nextAiring');
  return (
    <View style={styles.root}>
      <Text>{serie.get('title')}</Text>
    </View>
  );
};

SerieDetails.propTypes = {
  serie: PropTypes.object.isRequired,
};

export default SerieDetails;
