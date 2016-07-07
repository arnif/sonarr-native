import React, {PropTypes} from 'react';
import {Dimensions, View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {padWithZero} from '../../helpers/utilities';
import {BORDER_COLOR, TEXT_GRAY, RED} from '../../constants/brand';
import Label from '../Widgets/Label';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
  icon: {
    width: 30,
  },
  seriesName: {
    fontSize: 18,
  },
  serieInfo: {
    width: screen.width / 1.6,
  },
  small: {
    color: TEXT_GRAY,
    fontSize: 12,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightViewWrapper: {
    alignItems: 'center',
  },
});

const episodeEventTypeIconMap = {
  grabbed: 'cloud-download',
  downloadFolderImported: 'download',
  episodeFileDeleted: 'trash',
  downloadFailed: 'cloud-download',
};

const HistoryItem = ({item, onPress}) => {
  console.log(item);
  const seasonNum = item.getIn(['episode', 'seasonNumber']);
  const episodeNum = item.getIn(['episode', 'episodeNumber']);
  return (
    <View style={styles.root}>
      <Icon
        style={styles.icon}
        name={episodeEventTypeIconMap[item.get('eventType')] || 'cloud'}
        size={12}
        color={item.get('eventType') === 'downloadFailed' ? RED : TEXT_GRAY}
      />
      <View style={styles.wrapper}>
        <View style={styles.serieInfo}>
          <TouchableHighlight underlayColor="transparent" onPress={() => onPress()}>
            <Text style={styles.seriesName} numberOfLines={1}>{item.getIn(['series', 'title'])}</Text>
          </TouchableHighlight>
          <Text numberOfLines={1}>{item.getIn(['episode', 'title'])}</Text>
          <Text style={styles.small}>{moment(item.get('date')).fromNow()}</Text>
        </View>
        <View style={styles.rightViewWrapper}>
          <Text>
            {padWithZero(seasonNum)}x{padWithZero(episodeNum)}
          </Text>
          <Label
            style={styles.label}
            text={item.getIn(['quality', 'quality', 'name'])}
            invert={item.get('qualityCutoffNotMet')}
          />
        </View>
      </View>
    </View>
  );
};

HistoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default HistoryItem;
