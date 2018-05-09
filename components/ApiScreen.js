import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, ScrollView, Image, Text, 
  FlatList, SectionList, ActivityIndicator, ImageBackground, StatusBar, TextInput, KeyboardAvoidingView
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

export class ApiScreen extends React.Component {
    static navigationOptions = {
      title: 'Api',
      drawerLabel: 'Api',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../img/bck.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
    constructor(props){
      super(props);
      this.state = { 
        isLoading: true,
        data: [{'key': '0', 'value': 'response'}],
        currentApi: 'http://192.168.1.76:9000/api/name1',
        api1: 'http://192.168.1.76:9000/api/name1',
        api2: 'http://192.168.1.76:9000/api/name2',
       };
       this._onGetName1 = this._onGetName1.bind(this);
       this._setApi1 = this._setApi1.bind(this);
       this._setApi2 = this._setApi2.bind(this);
    }
    _onGetName1() {
      fetch(this.state.currentApi)
        .then((response) => response.json())
        .then((responseJson) => {
          //this.name1 = responseJson.message
          this.addToResponseData(responseJson.message);
          //Alert.alert(responseJson.message)
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(error)
        });
    }
    _setApi1() {
      this.setState({
        currentApi: this.state.api1, 
      })
    }
    _setApi2() {
      this.setState({
        currentApi: this.state.api2, 
      })
    }
    addToResponseData(value) {
      this.setState({
        data: [{'key': this.state.data.length.toString(), 'value': value.toString()}].concat(this.state.data) //(this.state.data.length+1).toString()
      })
    }
    render() {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {/* <ImageBackground source={require('./bck.png')}
          style={styles.backgroundImage}
          /> */}
          {/* <StatusBar
            barStyle="light-content" //dark-content
            backgroundColor="#6a51ae"
          /> */}
          <Text style={styles.sectionHeader}>Call an api</Text>
          <View style={styles.smallButtonContainer}>
            <Button
              onPress={this._setApi1}
              title='1'
              style={styles.smallButton}
            />
            <Button
              onPress={this._setApi2}
              title='2'
              style={styles.smallButton}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TextInput 
            value={this.state.currentApi}
            onChangeText={(text) => this.setState({api1: text})}
            ></TextInput>
            <Button
              onPress={this._onGetName1}
              title="Make GET request"
              color="#3498db"
            />
          </View>
          {/* <View style={styles.buttonContainer}>
            <Button
              onPress={this._onGetName2}
              title="Get name 2"
              color="#2980b9"
            />
          </View> */}
          <FlatList
            data={this.state.data}
            renderItem={({item, index}) => 
              <View style={styles.listItem}>
                <Text style={styles.listItemIndex}>{item.key}</Text>
                <Text style={styles.listItemText}>{item.value}</Text>
              </View>
            }
            //keyExtractor={(item, index) => 'list-item-${index}'}
            keyExtractor={(item, index) => 'list-item-${index}-${item.key}'}
            style={styles.list}
          />
        </KeyboardAvoidingView>
      );
    }
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 22,
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
    justifyContent: 'flex-start'
  },
  smallButton: {
    paddingRight: 10
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
    paddingTop: '25%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center'
  }
});