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
  Text,
  Alert
} from 'react-native';
import Dimensions from 'Dimensions';
import { TabNavigator } from 'react-navigation';

import arrowImg from '../img/left-arrow.png';
import AccountListScreen from './AccountListScreen';
import Icon from 'react-native-vector-icons/FontAwesome'

const SIZE = 40;

export default class PersonalDetailsScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
      const params = navigation.state.params || {};
      return {
      title: 'Personal Details',
      headerLeft: <TouchableOpacity
      onPress={() => {
          //this.props.navigation.toggleDrawer();
          navigation.navigate('DrawerOpen');
      }}>
      <Icon name={'navicon'} size={20} color='#0f469e' style={{paddingLeft: 15}}/></TouchableOpacity>
      ,//<View></View>
      headerRight: <Button title={'Logout'} color='#0f469e'
      onPress={() => {
          Alert.alert(
              'Log out',
              'Are you sure?',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                {text: 'Yes', onPress: () => params.onLogout()},
              ],
              { cancelable: false }
            )}}>
          </Button>
      }
  }

  componentDidMount() {
      this.props.navigation.setParams({
          onLogout: this.onLogout,
      })
  }

  onLogout() {
    this.props.navigation.navigate('Login');
  }

  constructor(props) {
    super(props);
    
    this.onLogout = this.onLogout.bind(this);
  }

  render() {
    return (
    <View style={{
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#ecf0f1'
    }}>
      <View style={{padding: 10}}>
        <Text>
          customerId: ggarter0
        </Text>
        <Text>
          firstName: Gilly
        </Text>
        <Text>
          lastName: Garter
        </Text>
        <Text>
          email: ggarter0@whitehouse.gov
        </Text>
        <Text>
          gender: Female
        </Text>
        <Text>
          DOB: "7/18/2017
        </Text>
        <Text>
          state: TX
        </Text>
        <Text>
          city: Houston
        </Text>
        <Text>
          postCode: 77234
        </Text>
        <Text>
          streetNumber: 413
        </Text>
        <Text>
          country: United States
        </Text>
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
