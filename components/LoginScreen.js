import React, {Component} from 'react';
import { ImageBackground, StyleSheet, Image, View, Text, KeyboardAvoidingView, 
  TextInput, TouchableOpacity, AsyncStorage, Button, Platform, SoftInputMode,
  Keyboard } from 'react-native'
import UserInput from './UserInput';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import ButtonSubmit from './ButtonSubmit'

import backgroundSrc from '../img/background3.jpg';
import logoImg from '../img/reactLogo.png';
import usernameImg from '../img/username.png';
import passwordImg from '../img/password.png';
import eyeImg from '../img/eye_black.png';

const isAndroid = Platform.OS === 'android';

export class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground style={styles.background}>
      <KeyboardAvoidingView behavior="padding" style={{
      flex: 4,
      alignItems: 'center',
      }}>
        {/* Logo */}
        <View style={styles.imageContainer}>
          {/* <Image source={logoImg} style={styles.image} /> */}
          {/* <Text style={styles.text}>react-app</Text> */}
        </View>
        <View style={{flex:1, justifyContent: 'flex-start'}}>
        {/* Submit (Login) */}
        <ButtonSubmit navigate={this.props.navigation.navigate} styles={{flex: 1, }}
        content={'LOGIN'}
        />
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#ecf0f1',
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100, //80
    height: 100, //80
  },
  text: {
    color: '#052d78',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'green',
  },
  btnEye: {
    position: 'absolute',
    top: 68,
    right: 32,
  },
  // btnEye: {
  //   position: 'relative',
  //   top: -50,
  //   right: -350,
  // },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  invalidContainer: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  signupContainer: {
    flex: 1,
    //top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signupText: {
    //color: 'white',
    backgroundColor: 'transparent',
  },
});