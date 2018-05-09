import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, ScrollView, Image, Text, 
  FlatList, SectionList, ActivityIndicator, ImageBackground, StatusBar
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../img/bck.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.sectionHeader}>Welcome!</Text>
          <Button
            title="Go to Api page"
            onPress={() => this.props.navigation.navigate('Api')}
          />
          {/* <Button
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
            title="Drawer"
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: '#e74c3c'
  },
  icon: {
    width: 24,
    height: 24,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    margin: 10,
  },
  smallButtonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2
  },
  listItem: {
    padding: 10,
    height: 44,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2c3e50',
    flexDirection: 'row'
  },
  listItemIndex: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
  listItemText: {
    fontSize: 18,
    color: '#ecf0f1',
    textAlign: 'center',
    paddingLeft: 50
  },
  sectionHeader: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center'
  }
});