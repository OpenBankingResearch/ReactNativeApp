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
import nbsLogo from '../img/nbs.png';
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
      showPass: true,
      press: false,
      invalidLogin: false,
      username: null,
      password: null
    };

    this.showPass = this.showPass.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.loginPreset = this.loginPreset.bind(this);
    //this.onForgottenPassword = this.passwordChange.bind(this);
    this.storeItem('token', 'myToken123');
    //this.props.navigation.navigate('PersonalDetails'); //MembersArea
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  userLogin(username, password) {
    if (username && password) {
      fetch("http://localhost:3001/sessions/create", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        this._onValueChange(STORAGE_KEY, responseData.id_token)
        return true;
      })
      .done();
    }
    return false;
  }

  onSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  onForgottenPassword() {
    console.log('forgottenPassword');
  }

  onLogin(callback) {
    //console.log('login ' + this.state.username);
    Keyboard.dismiss();
    // if (this.state.password != '123' && this.state.password != null) {
    //   this.setState({invalidLogin: !this.state.invalidLogin})
    //   setTimeout(() =>
    //   {
    //     this.setState({invalidLogin: !this.state.invalidLogin})
    //   }, 1000)
    // }
    // else {
    //   callback(this.state.username);
    // }
    callback(this.state.username);
    //this.props.navigate('AccountList', {username: this.state.username});
  }

  usernameChange(username) {
    this.state.username = username;
  }

  passwordChange(password) {
    this.state.password = password;
  }

  async storeItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  loginPreset(index) {
    if (index === 1) {
      this.setState({username: 'enipperhd', password: 'soinoe'});
    }
    else if (index === 2) {
      this.setState({username: 'ddoerlingef', password: 'sdwtnrbfds'});
    }
    else if (index === 3) {
      this.setState({username: 'hhaytonci', password: 'sdfowjvj'});
    }
  }

  render() {
    return (
      <ImageBackground style={styles.background}>
      <KeyboardAvoidingView behavior="padding" style={{
      flex: 4,
      alignItems: 'center',
      //borderWidth: 5,
      //borderColor: 'green',
      }}>
      <View style={{height: 10, borderColor: 'cyan', 
      //borderWidth: 2, 
      flex: 1, marginTop: 50, flexDirection: 'row', alignItems: 'center'}}>
        {/* <Button title={"1"} onPress={this.setLogin1} width={20} height={20} color="#841584"/> */}
        <TouchableOpacity onPress={() => this.loginPreset(1)} style={styles.presetButton}><Text>Preset 1</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this.loginPreset(2)} style={styles.presetButton}><Text>Preset 2</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this.loginPreset(3)} style={styles.presetButton}><Text>Preset 3</Text></TouchableOpacity>
      </View>
        {/* Logo */}
        <View style={styles.imageContainer}>
          <Image source={nbsLogo} style={styles.image} />
          <Text style={styles.text}>Banking App</Text>
        </View>
        <View style={{flex:2, justifyContent: 'flex-start'}}>
        {/* Login Form */}
          <UserInput
            source={usernameImg}
            placeholder="Username"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            onChangeText={this.usernameChange}
            value={this.state.username}
          />
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.passwordChange}
            value={this.state.password}
          />
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
          </TouchableOpacity> */}
        {/* Submit (Login) */}
        <ButtonSubmit onLogin={this.onLogin.bind(this)} navigate={this.props.navigation.navigate} styles={{flex: 1}}
        content={'LOGIN'}
        />
        </View>
        </KeyboardAvoidingView>
          {/* Signup */}
          <View style={styles.invalidContainer}>
            <View style={styles.signupContainer}>
              <TouchableOpacity
              activeOpacity={1}
              //onPress={this.onSignUp} 
              style={styles.signupText}>
              <Text style={{color:'#052d78'}}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
              activeOpacity={1}
              style={styles.signupText}>
              <Text style={{color:'#052d78'}}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#ecf0f1',
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 5,
    //borderColor: 'red',
  },
  image: {
    width: 100, //80
    height: 100, //80
    width: 50,
    height: 50,
    resizeMode: 'contain'
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
    top: 62,
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
    //borderWidth: 5,
    //borderColor: 'blue',
  },
  signupContainer: {
    flex: 1,
    //top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    //borderWidth: 5,
    //borderColor: 'red',
  },
  signupText: {
    //color: 'white',
    //backgroundColor: 'transparent',
    backgroundColor: 'transparent',
  },
  presetButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10, 
    margin: 10, 
    height: 40, 
    width: 100
  },
});