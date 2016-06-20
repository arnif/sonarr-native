import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import moment from 'moment';
import {GREEN, BLUE, DARKER_BLUE, RED, BORDER_COLOR} from '../../constants/brand';
import Label from '../Widgets/Label';
import SmartImage from '../Widgets/SmartImage';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
  posterImage: {
    width: 80,
    height: 120,
    marginRight: 10,
    borderRadius: 3,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    marginTop: 5,
    marginRight: 2,
  },
  labelWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  leftLabels: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  end: {
    alignSelf: 'flex-end',
  },
});

const getLabelColor = (fileCount, episodeCount, hasEnded) => {
  if (fileCount === episodeCount && hasEnded) {
    return GREEN;
  }

  if (fileCount === episodeCount) {
    return DARKER_BLUE;
  }
  return RED;
};

const SeriesItem = ({item, onPress, profile}) => {
  const nextAiring = item.get('nextAiring');
  const hasEnded = item.get('status') === 'ended';
  const seasonNr = item.get('seasonCount');
  const episodeFileCount = item.get('episodeFileCount') || 0;
  const episodeCount = item.get('episodeCount') || 0;
  const quality = profile.find((p) => p.get('id') === item.get('profileId'));
  return (
    <TouchableHighlight onPress={() => onPress()}>
      <View style={styles.root}>
        <SmartImage item={item} style={styles.posterImage} type="poster" />
        <View style={styles.textWrapper}>
          <Text>{item.get('title')}</Text>

          <View style={styles.labelWrapper}>
            <View style={styles.leftLabels}>

              {hasEnded &&
                <Label style={styles.label} text="Ended" color={RED} />
              }

              <Label style={styles.label} text={`Season ${seasonNr}`} color={BLUE} />
              <Label style={styles.label} text={quality.get('name')} />

              {nextAiring &&
                <Label style={styles.label} text={moment(nextAiring).fromNow()} />
              }
              <View style={styles.end}>
                <Label
                  style={styles.label}
                  text={`${episodeFileCount} / ${episodeCount}`}
                  color={getLabelColor(episodeFileCount, episodeCount, hasEnded)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

SeriesItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default SeriesItem;
