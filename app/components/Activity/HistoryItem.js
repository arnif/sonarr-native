import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {BORDER_COLOR} from '../../constants/brand';

// const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
});


const HistoryItem = ({item, onPress}) => {
  return (
    <View style={styles.root}>
      <TouchableHighlight underlayColor="transparent" onPress={() => onPress()}>
        <Text>{item.getIn(['series', 'title'])}</Text>
      </TouchableHighlight>
      <Text>{item.getIn(['episode', 'seasonNumber'])}x{item.getIn(['episode', 'episodeNumber'])}</Text>
      <Text>{item.getIn(['episode', 'title'])}</Text>
      <Text>{moment(item.get('date')).fromNow()}</Text>
      <View>
        {/* <Icon name="alarm" /> */}
      </View>
    </View>
  );
};

HistoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default HistoryItem;
