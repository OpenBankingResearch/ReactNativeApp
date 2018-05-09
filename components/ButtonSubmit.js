import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';

import spinner from '../img/loading3.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  loginSuccess(username) {
    //this.props.navigate('PersonalDetails')
    //console.log('buttonsubmit ' + username);
    this.props.navigate('AccountList', {username: username});
  }

  _onPress() {
    if (this.state.isLoading) return;
    
    this.props.onLogin(this.loginSuccess.bind(this));
    return;
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{width: DEVICE_WIDTH - MARGIN }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>{this.props.content}</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //top: -135, //-135
    alignItems: 'center',
    justifyContent: 'flex-start',
    //borderWidth: 5, 
    //borderColor: 'yellow'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#052d78', //#F035E0
    height: MARGIN,
    borderRadius: 0, //20
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#2980b9', //#F035E0
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#2980b9', //#F035E0
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 100, //24
    height: 100, //24
  },
});
