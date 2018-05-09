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
  FlatList,
  Text,
  Alert,
} from 'react-native';
import Dimensions from 'Dimensions';

import arrowImg from '../img/left-arrow.png';
import Icon from 'react-native-vector-icons/FontAwesome'

const SIZE = 40;

export default class BalancesScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const params = navigation.state.params || {};
        return {
        title: 'Accounts',
        headerLeft: <TouchableOpacity
        onPress={() => {
            this.props.navigation.toggleDrawer();
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

  constructor(props) {
    super(props);

    //this.props.navigation.toggleDrawer();
    this.state = {
      isLoading: false,
      accounts: [
          {name: 'Current Account', balance: '560.45', sortCode: '05-23-81', accountNumber: '45367863', key: 1},
          {name: 'Savings Account', balance: '14000.01', sortCode: '05-23-81', accountNumber: '45367863', key: 2},
          {name: 'Credit Card', balance: '5000.90', sortCode: '05-23-81', accountNumber: '45367863', key: 3},
          {name: 'Regular Saver1', balance: '5000.00', sortCode: '05-23-81', accountNumber: '45367863', key: 4},
          {name: 'Regular Saver2', balance: '5000.00', sortCode: '05-23-81', accountNumber: '45367863', key: 5},
          {name: 'Regular Saver3', balance: '5000.00', sortCode: '05-23-81', accountNumber: '45367863', key: 6},
          {name: 'Regular Saver4', balance: '5000.00', sortCode: '05-23-81', accountNumber: '45367863', key: 7},
          {name: 'Regular Saver5', balance: '5000.00', sortCode: '05-23-81', accountNumber: '45367863', key: 8},
          {name: 'Regular Saver6', balance: '5000.00', sortCode: '05-23-81', accountNumber: '45367863', key: 9},
      ]
    };

    this.onPressBack = this.onPressBack.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.growAnimated = new Animated.Value(0);
  }

  onLogout() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});

    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this.props.navigation.goBack();
    }, 500);
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  
  async onPressDoSomething() {
    var DEMO_TOKEN = await AsyncStorage.getItem('token'); //STORAGE_KEY
    console.log(DEMO_TOKEN);
    // fetch("http://localhost:3001/api/data", {
    //     method: "GET",
    //     headers: {
    //     'Authorization': 'Bearer ' + DEMO_TOKEN
    //     }
    // })
    // .then((response) => response.json())
    // .then((responseData) => {
    //     Alert.alert(responseData.data);
    // })
    // .done();
  }

  onPressBack() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});

    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this.props.navigation.goBack();
    }, 500);
  }

  onAccountDetails(index) {
    this.props.navigation.navigate('Account', {
        name: this.state.accounts[index].name,
        sortCode: this.state.accounts[index].sortCode,
        accountNumber: this.state.accounts[index].accountNumber,
        balance: this.state.accounts[index].balance,
    });
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });

    return (
    <View style={styles.container}>
    <FlatList 
    data={this.state.accounts}
    style={{padding:15}}
    keyExtractor={(item, index) => item.key.toString()}
    renderItem={({item, index}) => 
        <TouchableOpacity 
        key={index}
        onPress={() => this.onAccountDetails(index)}
        style={styles.accountItem}>
        <View style={styles.accountItemInner}>
            <View>
                <View key={'1-'+{index}} style={{}}>
                <Text key={'2-'+{index}} style={{color: "#0f469e", fontSize: 20}}>{item.name}
                </Text></View>
                <View key={'v1-'+{index}}><Text key={'vt1-'+{index}} style={{color: '#bdc3c7'}}>{item.sortCode} | {item.accountNumber}</Text></View>
            </View>
            <View style={{
                }}>
                <View key={'v2-'+{index}}><Text key={'vt2-'+{index}} style={{
                    fontSize: 20,
                    color: '#0f469e',
                    //alignSelf: 'flex-end',
                }}>
                £{item.balance}</Text></View>
            </View>
        </View>
        </TouchableOpacity>
    }
    />
        {/* <View style={styles.container}>
            <TouchableOpacity
            onPress={this.onPressBack}
            style={styles.button}
            activeOpacity={1}>
            <Image style={styles.image} source={arrowImg} />
            </TouchableOpacity>
            <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
            />
        </View> */}
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#ecf0f1'
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
    accountItem: {
      backgroundColor: 'white',
      borderColor: '#2f73e0',
      borderLeftWidth: 3,
      marginBottom: 10,
      borderRadius: 3,
    },
    accountItemInner: {
        borderColor: '#7f8c8d',
        borderWidth: 1,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 2,
    },
  });

  const stylesOld = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#34495e'
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
    accountItem: {
      backgroundColor: 'white',
      borderColor: '#e74c3c',
      borderLeftWidth: 2,
      marginBottom: 10,
      padding: 10,
      borderRadius: 10,
    },
  });
    