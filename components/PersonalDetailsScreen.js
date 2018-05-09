import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
  AsyncStorage,
  Text
} from 'react-native';
import Dimensions from 'Dimensions';
import { TabNavigator } from 'react-navigation';

import arrowImg from '../img/left-arrow.png';
import BalancesScreen from './BalancesScreen';

const SIZE = 40;

export default class PersonalDetailsScreen extends Component {
  render() {
    return (
    <View style={{
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#34495e'
    }}>
      <View style={{padding: 10}}>
        <TouchableOpacity 
          style={{
              backgroundColor: 'white',
              borderColor: '#e74c3c',
              borderLeftWidth: 2,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
              width: '50%'
          }}>
          <Text>Account List</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
              backgroundColor: 'white',
              borderColor: '#e74c3c',
              borderLeftWidth: 2,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
              width: '50%'
          }}>
          <Text>Account Details</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
    backgroundColor: '#2980b9', //F035E0
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: '#2980b9', //F035E0
  },
  image: {
    width: 24,
    height: 24,
  },
});
