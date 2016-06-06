import React, {PropTypes} from 'react';
import {Image, View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import moment from 'moment';
import {GREEN, BLUE, DARKER_BLUE, RED} from '../../constants/brand';
import Label from '../Widgets/Label';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#D4D3D3',
  },
  posterImage: {
    width: 80,
    height: 120,
    marginRight: 20,
  },
  textWrapper: {
    flex: 1,
  },
  labelWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  leftLabels: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
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

const SeriesItem = ({item, onPress}) => {
  const posterImage = item.get('images').find((i) => i.get('coverType') === 'poster').get('url');
  const imageUrl = `http://10.0.1.10:8989${posterImage}`;
  const nextAiring = item.get('nextAiring');
  const hasEnded = item.get('status') === 'ended';
  const seasonNr = item.get('seasonCount');
  const episodeFileCount = item.get('episodeFileCount');
  const episodeCount = item.get('episodeCount');
  return (
    <TouchableHighlight onPress={() => onPress()}>
      <View style={styles.root}>
        <Image source={{uri: imageUrl}} style={styles.posterImage} />
        <View style={styles.textWrapper}>
          <Text>{item.get('title')}</Text>

          <View style={styles.labelWrapper}>
            <View style={styles.leftLabels}>

              {hasEnded &&
                <Label text="Ended" color={RED} />
              }

              <Label text={`Season ${seasonNr}`} color={BLUE} />

              {nextAiring &&
                <Label text={moment(nextAiring).format('dddd')} />
              }
              <View style={styles.end}>
                <Label
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
};

export default SeriesItem;
