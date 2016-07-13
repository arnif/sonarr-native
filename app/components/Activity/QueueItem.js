import React, {PropTypes} from 'react';
import {Dimensions, View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {padWithZero} from '../../helpers/utilities';
import {BORDER_COLOR, TEXT_GRAY, RED, GREEN} from '../../constants/brand';
import Label from '../Widgets/Label';
import Progressbar from '../Widgets/Progressbar';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
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
  protocolLabel: {
    marginTop: 3,
  },
});

const episodeEventTypeIconMap = {
  grabbed: 'cloud-download',
  downloadFolderImported: 'download',
  episodeFileDeleted: 'trash',
  downloadFailed: 'cloud-download',
};

const QueueItem = ({item, onPress}) => {
  const seasonNum = item.getIn(['episode', 'seasonNumber']);
  const episodeNum = item.getIn(['episode', 'episodeNumber']);

  return (
    <View style={styles.root}>
      <View style={styles.content}>
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
            {item.get('timeleft') && <Text style={styles.small}>Time left: {item.get('timeleft')}</Text>}
          </View>
          <View style={styles.rightViewWrapper}>
            <Text>
              {padWithZero(seasonNum)}x{padWithZero(episodeNum)}
            </Text>
            <Label
              text={item.getIn(['quality', 'quality', 'name'])}
              invert={item.get('qualityCutoffNotMet')}
            />
            <Label
              style={styles.protocolLabel}
              text={item.get('protocol')}
              color={GREEN}
            />
          </View>
        </View>
      </View>
      <View>
        <Progressbar currentValue={item.get('sizeleft')} totalValue={item.get('size')} />
      </View>
    </View>
  );
};

QueueItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default QueueItem;
