import React, {PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {BLUE} from '../../../constants/brand';
import Label from '../../Widgets/Label';
import EmptyState from '../../Widgets/EmptyState';

const styles = StyleSheet.create({
  label: {
    marginTop: 5,
    marginRight: 5,
  },
  labelWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  overview: {
    fontStyle: 'italic',
    padding: 5,
  },
});

const EpisodeSummary = ({episode, episodeFile, quality, series}) => (
  <View>
    <View style={styles.labelWrapper}>
      <Label style={styles.label} text={quality.name} />
      <Label style={styles.label} text={series.network} color={BLUE} />
      <Label style={styles.label} text={moment(episode.airDateUtc).format('HH:mm')} color={BLUE} />
      <Label style={styles.label} text={moment(episode.airDateUtc).fromNow()} color={BLUE} />
    </View>
    <View>
      <Text style={styles.overview}>
        {episode.overview}
      </Text>
    </View>

    {!episodeFile && <EmptyState text="No file available for this episode." />}
  </View>
);

EpisodeSummary.propTypes = {
  episode: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
  quality: PropTypes.object.isRequired,
  episodeFile: PropTypes.object,
};

export default EpisodeSummary;
