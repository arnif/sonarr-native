import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hideModal} from '../../actions/modal';
import {BACKGROUND_GRAY, BLUE} from '../../constants/brand';
import {padWithZero} from '../../helpers/utilities';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    height: 0,
  },
  tabText: {
    textAlign: 'center',
    color: BLUE,
  },

  rightButton: {
    width: screen.width / 3.3,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BLUE,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
  },
  middleButton: {
    width: screen.width / 3.3,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderWidth: 1,
    borderColor: BLUE,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  leftButton: {
    width: screen.width / 3.3,
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BLUE,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
  },
  selected: {
    backgroundColor: BLUE,
  },
  selectedText: {
    color: 'white',
  },
});


class EpisodeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRoute: {
        name: 'summary',
        component: '',
      },
    };
  }

  onPress(routeName, component) {
    this.setState({
      selectedRoute: {
        name: routeName,
        component,
      },
    });
  }


  render() {
    const {episode, series} = this.props;
    console.log('details', this.props);
    const episodeNr = `${episode.seasonNumber}x${padWithZero(episode.episodeNumber)}`;
    return (
      <View>
        <StatusBar
          backgroundColor={BACKGROUND_GRAY}
          hidden
          animated
        />
        <View>
          <TouchableHighlight underlayColor="transparent" onPress={this.props.hideModal}>
            <Text style={{color: 'red'}}>Close</Text>
          </TouchableHighlight>
        </View>
        <Text>{`${series.title} - ${episodeNr} - ${episode.title}`}</Text>

        <View style={styles.tabWrapper}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.onPress('summary', '')}
          >
            <View style={[styles.rightButton, this.state.selectedRoute.name === 'summary' && styles.selected]}>
              <Text style={[styles.tabText, this.state.selectedRoute.name === 'summary' && styles.selectedText]}>
                Summary
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.onPress('history', '')}
          >
            <View style={[styles.middleButton, this.state.selectedRoute.name === 'history' && styles.selected]}>
              <Text style={[styles.tabText, this.state.selectedRoute.name === 'history' && styles.selectedText]}>
                History
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.onPress('search', '')}
          >
            <View style={[styles.leftButton, this.state.selectedRoute.name === 'search' && styles.selected]}>
              <Text style={[styles.tabText, this.state.selectedRoute.name === 'search' && styles.selectedText]}>
                Search
              </Text>
            </View>
          </TouchableHighlight>
        </View>


      </View>
    );
  }
}

EpisodeDetails.propTypes = {
  hideModal: PropTypes.func.isRequired,
  episode: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
};

const stateToProps = (state) => ({
  results: state.Search.get('searchResults'),
  pending: state.Search.get('pending'),
});

const dispatchToProps = (dispatch) => {
  const actions = {
    hideModal,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(stateToProps, dispatchToProps)(EpisodeDetails);
