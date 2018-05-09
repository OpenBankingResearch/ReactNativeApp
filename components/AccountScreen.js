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
  FlatList,
} from 'react-native';
import Dimensions from 'Dimensions';

import arrowImg from '../img/left-arrow.png';

const SIZE = 40;

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);
    
    const { params } = this.props.navigation.state;
    console.log(params.index);
    this.state = {
        name: params.name,
        sortCode: params.sortCode,
        accountNumber: params.accountNumber,
        balance: params.balance,
        transactions: null
    };

    this.onPressBack = this.onPressBack.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.growAnimated = new Animated.Value(0);
    this.getTransactions();
  }

//   {date: '02/03/2017', amount: 100, key: 1},
//   {date: '02/03/2017', amount: 200, key: 2},
//   {date: '02/03/2017', amount: 200, key: 3},
//   {date: '02/03/2017', amount: 200, key: 4},
//   {date: '02/03/2017', amount: 200, key: 5},
//   {date: '02/03/2017', amount: 200, key: 6},
//   {date: '02/03/2017', amount: 200, key: 7},
// ]

  async userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
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
  
  async getTransactions() {
    //var DEMO_TOKEN = await AsyncStorage.getItem('token'); //STORAGE_KEY
    //console.log(DEMO_TOKEN);
    fetch("https://api.mockaroo.com/api/6bb15c60?count=20&key=dd95b940", {
        method: "GET"
    })
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({transactions: responseData});
    })
    .done();
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });

    return (
    <View style={{
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#34495e',
    justifyContent: 'flex-start'
    }}>
        <View style={{
        alignItems: 'center',
        paddingTop: 10
        }}>
            <Text style={{fontSize: 20, color: 'white'}}>Account name: {this.state.name}</Text>
            <Text style={{fontSize: 20, color: 'white'}}>Sort Code: {this.state.sortCode}</Text>
            <Text style={{fontSize: 20, color: 'white'}}>Account number: {this.state.accountNumber}</Text>
            <Text style={{fontSize: 20, color: 'white'}}>Balance: £{this.state.balance}</Text>
        </View>
        <View style={{}}>
        <FlatList 
        data={this.state.transactions}
        style={{padding:10}}
        keyExtractor={(item, index) => item.transaction_id.toString()} //item.key.toString()
        renderItem={({item, index}) => 
            <TouchableOpacity 
            key={index}
            //onPress={() => this.onAccountDetails(index)}
            style={{
                backgroundColor: 'white',
                marginBottom: 10,
                padding: 10,
                borderRadius: 10,
            }}>
            <View key={'1-'+{index}} style={{}}>
                <Text key={'2-'+{index}} style={{color: "black", fontSize: 20}}>Date: {item.date}
                </Text>
                <Text key={'3-'+{index}} style={{color: "black", fontSize: 20}}>Amount: £{item.amount.toString()}
                </Text>
            <View style={{}}>
                <Text key={'4-'+{index}} style={{color: "black", fontSize: 16}}>Creditor: {item.creditor_first_name} {item.creditor_last_name}
                </Text>
                <Text key={'6-'+{index}} style={{color: "black", fontSize: 16}}>Debtor: {item.debtor_first_name} {item.debtor_last_name}
                </Text>
            </View>
            </View>
            </TouchableOpacity>
        }
        />
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
