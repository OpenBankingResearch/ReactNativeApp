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
  
  async getDetails() {
    // if (!this.state.isFetching) {
    //   this.state.isFetching = true;
    // } else return;
    var username = this.state.username;
    console.log('personal details: ' + username);
    var url = "http://52.50.41.159:8087/api/Customer/" + username;
    //console.log('GET request from ' + url);
    fetch(url, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          //'userId': this.state.userId
        }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      this.setState({details: responseData});
      this.setState({isLoading: false});
    }).catch((error) => {
      console.log("error: " + error);
      //this.getAccounts();
    })
    .done();
  }

  onLogout() {
    this.props.navigation.navigate('Login');
  }

  constructor(props) {
    super(props);

    this.state = {
      details: {},
    }
    
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    await this.init()

    this.props.navigation.setParams({
      onLogout: this.onLogout,
    })
  }
  
  async init() {
      const value = await AsyncStorage.getItem('username');

      this.setState({username: value});

      this.getDetails();
  }

  render() {
    const details = this.state.details;
    return (
    <View style={{
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#ecf0f1'
    }}>
      <View style={{padding: 10}}>
        <Text style={styles.text}>
          Customer Id: <Text>{details.customerId}</Text>
        </Text>
        <Text style={styles.text}>
          First Name: {details.firstName}
        </Text>
        <Text style={styles.text}>
          Last Name: {details.lastName}
        </Text>
        <Text style={styles.text}>
          Gender: {details.gender}
        </Text>
        <Text style={styles.text}>
          Email: {details.email}
        </Text>
        <Text style={styles.text}>
          Date Of Birth: {details.dob}
        </Text>
        <Text style={styles.text}>
          State: {details.state}
        </Text>
        <Text style={styles.text}>
          City: {details.city}
        </Text>
        <Text style={styles.text}>
          Post Code: {details.postCode}
        </Text>
        <Text style={styles.text}>
          Street Number: {details.streetNumber}
        </Text>
        <Text style={styles.text}>
          Counter: {details.country}
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
  text: {
    color: "#0f469e", fontSize: 20
  }
});
