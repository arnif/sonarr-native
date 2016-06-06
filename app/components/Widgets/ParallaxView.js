import React, {
  Component,
  Children,
  cloneElement,
  PropTypes,
} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
  },
});

class ParallaxView extends Component {

  static propTypes = {
    ...ScrollView.propTypes,
    headerHeight: PropTypes.number.isRequired,
    renderHeader: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    const neutralHeight = this.props.headerHeight;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [-neutralHeight, 0, neutralHeight],
      outputRange: [2 * neutralHeight, neutralHeight, 0],
    });
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
          {Children.map(this.props.renderHeader(), (element) => cloneElement(element, {height: headerHeight}))}
        </Animated.View>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          contentInset={{bottom: 64}}
        >
          <View style={[styles.contentContainer, {marginTop: neutralHeight}]}>
            {this.props.children}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ParallaxView;
