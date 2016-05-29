import React, {PropTypes} from 'react';
import {Dimensions, Image, View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import moment from 'moment';

const screen = Dimensions.get('window');

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
    width: screen.width / 2,
  },
  labelWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
  },
  end: {
    alignItems: 'flex-end',
  },
});


const SeriesItem = ({item, onPress}) => {
  const posterImage = item.get('images').find((i) => i.get('coverType') === 'poster').get('url');
  const imageUrl = `http://10.0.1.10:8989${posterImage}`;
  const nextAiring = item.get('nextAiring');
  return (
    <TouchableHighlight onPress={() => onPress()}>
      <View style={styles.root}>
        <Image source={{uri: imageUrl}} style={styles.posterImage} />
        <View style={styles.textWrapper}>
          <Text>{item.get('title')}</Text>

          <View style={styles.labelWrapper}>
            {nextAiring &&
              <Text style={styles.label}>{moment(nextAiring).format('dddd')}</Text>
            }
            <Text style={styles.end}>{item.get('episodeFileCount')} / {item.get('episodeCount')}</Text>
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
