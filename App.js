import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, ScrollView, Image, Text, 
  FlatList, SectionList, ActivityIndicator, ImageBackground, StatusBar
} from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { HomeScreen } from './components/HomeScreen.js';
import { ApiScreen } from './components/ApiScreen.js';
import { LoginScreen } from './components/LoginScreen.js'

import MembersScreen from './components/MembersScreen';
import SignUpScreen from './components/SignUpScreen';
import AccountListScreen from './components/AccountListScreen.js';
import AccountDetailsScreen from './components/AccountDetailsScreen.js';
import PersonalDetailsScreen from './components/PersonalDetailsScreen.js';

// const MyApp = DrawerNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
//   Api: {
//     screen: ApiScreen,
//   },
// },
// {
//   drawerPosition: 'left',
//   initialRouteName: 'Home',
//   drawerBackgroundColor: '#f39c12',
//   drawerWidth: 200
// }
// );

const DrawerStack = DrawerNavigator({
  AccountList: { screen: AccountListScreen },
  PersonalDetails: { screen: PersonalDetailsScreen },
})

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    MembersArea: {
      //screen: MembersScreen,
      screen: DrawerStack,
    },
    // SignUp: {
    //   screen: SignUpScreen
    // },
    // AccountList: {
    //   screen: AccountListScreen
    // },
    // AccountDetails: {
    //   screen: AccountDetailsScreen
    // }
  },
  {
    //headerMode: 'none',
    headerLeft: 'none',
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ecf0f1',
      },
      visible: false,
      headerTintColor: '#0f469e', //text
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}