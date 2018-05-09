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
  TextInput
} from 'react-native';
import Dimensions from 'Dimensions';
import { HeaderBackArrow } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome'
import arrowImg from '../img/left-arrow.png';

const SIZE = 40;

export default class AccountScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    const params = navigation.state.params || {};
    return {
    title: 'Account Details',
    headerLeft:
    <TouchableOpacity
    onPress={() => {
        navigation.navigate('AccountList');
    }}>
    <Icon name={'chevron-left'} size={20} color='#0f469e' style={{paddingLeft: 15}}/>
    {/* <Text>Account List</Text> */}
    </TouchableOpacity>
    }
}
  
  constructor(props) {
    super(props);
    
    const { params } = this.props.navigation.state;
    //console.log(params.index);
    this.state = {
        customerId: params.customerId,
        creditCardNumber: params.creditCardNumber,
        creditCardType: params.creditCardType,
        issueDate: params.issueDate,
        expiryDate: params.expiryDate,
        cvv: params.cvv,
        maxLimit: params.maxLimit,
        transactions: null
    };

    this.getTransactions = this.getTransactions.bind(this);
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
    return (
    <View style={{
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#ecf0f1',
    justifyContent: 'flex-start'
    }}>
        <View style={{
        alignItems: 'center',
        paddingTop: 10,
        }}>
            {/* <Text style={{fontSize: 15, color: '#052d78'}}>Customer Id</Text>
            <Text style={{fontSize: 20, color: '#052d78'}}>{this.state.customerId}</Text> */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'stretch',
                padding: 10,
                }}>
              <View>
                <Text style={{fontSize: 15, color: '#052d78'}}>Credit Card Number</Text>
                <Text style={{fontSize: 20, color: '#052d78'}}>{this.state.creditCardNumber}</Text>
                <Text style={{fontSize: 15, color: '#052d78'}}>Credit Card Type</Text>
                <Text style={{fontSize: 20, color: '#052d78'}}>{this.state.creditCardType}</Text>
                <Text style={{fontSize: 15, color: '#052d78'}}>Issue Date</Text>
                <Text style={{fontSize: 20, color: '#052d78'}}>{this.state.issueDate}</Text>
                <Text style={{fontSize: 15, color: '#052d78'}}>Expiry Date</Text>
                <Text style={{fontSize: 20, color: '#052d78'}}>{this.state.expiryDate}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontSize: 15, color: '#052d78'}}>Max Limit</Text>
                <Text style={{fontSize: 20, color: '#052d78'}}>£{this.state.maxLimit}</Text>
                <Text style={{fontSize: 15, color: '#052d78'}}>CVV</Text>
                <Text style={{fontSize: 20, color: '#052d78'}}>{this.state.cvv}</Text>
              </View>
            </View>
        </View>
        <View style={{backgroundColor: 'white', marginTop: 10}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TextInput style={{marginTop: 10, backgroundColor: '#ecf0f1', width: DEVICE_WIDTH * 0.9, height: 40, borderRadius: 5,
        borderColor: '#7f8c8d', borderWidth: 1, textAlign: 'center'}} placeholder={'Search Transactions'}>
        </TextInput>
        <Icon name={'search'} size={20} color='#0f469e' style={{paddingLeft: 15,
        position: 'absolute',
        left: 82,
        top: 18,
        }}/>
        </View>
        <FlatList 
        data={this.state.transactions}
        style={{padding:10}}
        keyExtractor={(item, index) => item.transaction_id.toString()} //item.key.toString()
        renderItem={({item, index}) => 
            <TouchableOpacity 
            key={index}
            //onPress={() => this.onAccountDetails(index)}
            style={{
                marginBottom: 10,
                padding: 10,
                borderBottomColor: '#bdc3c7',
                borderBottomWidth: 2,
            }}>
            
            <View key={'1-'+{index}} style={{}}>
                <Text key={'2-'+{index}} style={{color: "#052d78", fontSize: 20}}>{item.creditor_first_name} {item.creditor_last_name}
                </Text>
                <Text key={'3-'+{index}} style={{color: "#052d78", fontSize: 20}}>£{item.amount.toString()}
                </Text>
            </View>
            
            {/* <View key={'1-'+{index}} style={{}}>
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
            </View> */}
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
