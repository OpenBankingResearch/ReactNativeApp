import React, {Component} from 'react';
import { ImageBackground, StyleSheet, Image, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import UserInput from './UserInput';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import ButtonSubmit from './ButtonSubmit'

import backgroundSrc from '../img/background3.jpg';
import logoImg from '../img/reactLogo.png';
import usernameImg from '../img/username.png';
import passwordImg from '../img/password.png';
import eyeImg from '../img/eye_black.png';

export default class SignUpScreen extends React.Component {
    static navigationOptions = {
      title: 'SignUp',
    }

    constructor(props) {
        super(props);
        this.state = {
          showPass: true,
          press: false,
          invalidLogin: false,
          password: null
        };
        this.showPass = this.showPass.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    showPass() {
      this.state.press === false
        ? this.setState({showPass: false, press: true})
        : this.setState({showPass: true, press: false});
    }

    onCreateAccount() {
      console.log("create account");
    }

    passwordChange(password) {
      this.state.password = password;
    }

    render() {
      return (
        <ImageBackground style={styles.background}>
          {/* Logo */}
          <View style={styles.imageContainer}>
            <Image source={logoImg} style={styles.image} />
            <Text style={styles.text}>Create account</Text>
          </View>
          {/* Login Form */}
          <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
            <UserInput
              source={usernameImg}
              placeholder="Username"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
            />
            <UserInput
              source={passwordImg}
              secureTextEntry={this.state.showPass}
              placeholder="Password"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this.passwordChange}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEye}
              onPress={this.showPass}>
            <Image source={eyeImg} style={styles.iconEye} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
          {/* Submit (Login) */}
          <ButtonSubmit onLogin={this.onCreateAccount.bind(this)} navigate={this.props.navigation.navigate} 
          content={'CREATE ACCOUNT'}
          />
          {/* Signup */}
          <View style={styles.invalidContainer}>
              {this.state.invalidLogin ? 
              <Text style={{flex: 2, color: '#e74c3c', fontSize: 20, left: DEVICE_WIDTH/3}}>Invalid Login!
              </Text>
              : null}
          </View>
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
      backgroundColor: '#34495e'
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
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      marginTop: 20,
    },
    loginContainer: {
      flex: 1,
      alignItems: 'center',
    },
    btnEye: {
      position: 'absolute',
      top: 68,
      right: 32,
    },
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
    signupContainer: {
      flex: 1,
      top: 65,
      width: DEVICE_WIDTH,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    invalidContainer: {
      flex: 1,
      width: DEVICE_WIDTH,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    signupText: {
      color: 'white',
      backgroundColor: 'transparent',
    },
  });