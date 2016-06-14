import React, {PropTypes} from 'react';
import {View, Image, Text} from 'react-native';
import {BORDER_COLOR, TEXT_GRAY, RED} from '../../constants/brand';
import Label from '../Widgets/Label';
import SmartImage from '../Widgets/SmartImage';

const styles = {
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    marginTop: -1,
  },
  posterImage: {
    width: 80,
    height: 120,
    marginRight: 20,
    borderRadius: 3,
  },
  textWrapper: {
    flex: 1,
  },
  labelWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  label: {
    marginRight: 5,
  },
  year: {
    color: TEXT_GRAY,
    fontStyle: 'italic',
  },
};

const SearchResultsItem = ({item}) => {
  console.log(item);
  const hasEnded = item.get('status') === 'ended';
  return (
    <View style={styles.row}>
      <SmartImage item={item} style={styles.posterImage} type="poster" />
      <View style={styles.textWrapper}>
        <Text>
          {item.get('title')}
          <Text style={styles.year}> ({item.get('year')})</Text>
        </Text>
        <View style={styles.labelWrapper}>
          <Label text={item.get('network')} style={styles.label} />
          {hasEnded &&
            <Label text="Ended" color={RED} />
          }

        </View>
      </View>
    </View>
  );
};

SearchResultsItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SearchResultsItem;
