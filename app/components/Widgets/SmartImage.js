import React, {PropTypes} from 'react';
import {Image} from 'react-native';
import * as apiActions from '../../actions/api';

export const getImageUrl = (item, type) => {
  const hostname = apiActions.getHostName();
  const hasPosterImage = item.get('images').find((i) => i.get('coverType') === type);
  const posterImage = hasPosterImage && hasPosterImage.get('url');
  if (!posterImage) {
    return `${hostname}/Content/Images/poster-dark.png`;
  }
  if (posterImage.indexOf('http') > -1) {
    return posterImage;
  }
  return `${hostname}${posterImage}`;
};

const SmartImage = ({item, type, style}) => {
  const imageUrl = getImageUrl(item, type);
  return (
    <Image source={{uri: imageUrl}} style={style} />
  );
};


SmartImage.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
};

export default SmartImage;
