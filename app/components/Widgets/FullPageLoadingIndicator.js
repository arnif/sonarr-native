import React from 'react';
import {ActivityIndicator, Modal, View, StyleSheet} from 'react-native';
import {BLUE} from '../../constants/brand';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorWrapper: {
    borderRadius: 4,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  indicator: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const FullPageLoadingIndicator = () => (
  <Modal
    animationType="none"
    visible
    transparent
  >
    <View style={styles.root}>
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator
          animating
          style={styles.indicator}
          size="large"
          color={BLUE}
        />
      </View>
    </View>
  </Modal>
);

export default FullPageLoadingIndicator;
