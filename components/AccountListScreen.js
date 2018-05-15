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
import spinner from '../img/loading3.gif';
import creditCard from '../img/creditCard.png';

const SIZE = 40;

export default class AccountListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const params = navigation.state.params || {};
        return {
        isFetching: false,
        title: 'Account List',
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

    componentDidMount() {
        this.props.navigation.setParams({
            onLogout: this.onLogout,
        });
    }

  constructor(props) {
    super(props);

    //this.props.navigation.toggleDrawer();
    this.state = {
      isLoading: true,
      userId: this.props.navigation.getParam('username'),
      creditCard: [],
      mortgage: [],
      accounts: []
    };

    if (this.state.userId !== undefined) {
      this.storeItem('username', this.state.userId);
      console.log('UserId: ' + this.state.userId);
    }

    this.onLogout = this.onLogout.bind(this);
    //this.getAccounts = this.getAccounts.bind(this);
    this.onAccountDetails = this.onAccountDetails.bind(this);
    this.growAnimated = new Animated.Value(0);

    this.getAccounts();
  }

  async storeItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  onLogout() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});

    this.props.navigation.navigate('Login');
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  
  async getAccounts() {
    // if (!this.state.isFetching) {
    //   this.state.isFetching = true;
    // } else return;

    var customerId = this.state.userId;
    //customerId = 'enipperhd';

    var url = "http://52.50.41.159:8087/api/creditcard/" + customerId;
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
      //console.log(responseData);
      this.setState({creditCard: [responseData]});
      //this.setState({mortgage: [responseData]});
      //console.log(this.state.creditCard);
      this.setState({isLoading: false});
    }).catch((error) => {
      console.log("error: " + error);
      //this.getAccounts();
    })
    .done();

    url = "http://52.50.41.159:8087/api/mortgages/" + customerId;
    ///console.log('GET request from ' + url);
    fetch(url, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          //'userId': this.state.userId
        }
    })
    .then((response) => response.json())
    .then((responseData) => {
      //console.log(responseData);
      //this.setState({creditCard: [responseData]});
      this.setState({mortgage: responseData});
      //console.log(this.state.creditCard);
      this.setState({isLoading: false});
    }).catch((error) => {
      console.log("error: " + error);
      //this.getAccounts();
    })
    .done();
  }

  onAccountDetails(item) {
    //console.log('selected item: ' + item);
    var account = item;
    this.props.navigation.navigate('AccountDetails', {
        customerId: account.customerId,
        creditCardNumber: account.creditCardNumber,
        creditCardType: account.creditCardType,
        issueDate: account.issueDate,
        expiryDate: account.expiryDate,
        cvv: account.cvv,
        maxLimit: account.maxLimit,
    });
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });
    //console.log('account: ' + this.state.accounts[0]);
    //console.log(this.state.creditCard);

    return (
    <View style={styles.container}>
    {this.state.isLoading ? (
    <Image source={spinner} style={styles.spinner} /> 
    ) : ( null )}
    <FlatList 
    data={this.state.creditCard}
    style={{padding:15}}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item, index}) => 
        <TouchableOpacity 
        key={index}
        onPress={() => this.onAccountDetails(item)}
        style={styles.accountItemCC}>
        <View style={styles.accountItemInner}>
        <View style={styles.accountItemInnerRow}>
            <View>
            {/* 
            customerId
            creditCardNumber
            creditCardType
            issueDate
            expiryDate
            cvv
            maxLimit
            */}
              <View key={'1-'+{index}} style={{}}>
                <Text key={'2-'+{index}} style={{color: "#0f469e", fontSize: 20}}>Credit Card
                </Text>
                <View key={'v1-'+{index}}><Text key={'vt1-'+{index}} style={{color: '#bdc3c7'}}>{item.creditCardNumber}</Text></View>
              </View>
            </View>
            <View style={{
              alignItems: 'flex-end'
                }}>
                <View key={'v2-'+{index}}><Text key={'vt2-'+{index}} style={{
                    fontSize: 16,
                    color: '#0f469e',
                }}>
                Max limit: £{item.maxLimit}</Text></View>
                <View key={'v1-'+{index}}><Text key={'vt1-'+{index}} style={{color: '#bdc3c7'}}>Available: £{item.maxLimit}</Text></View> 
            </View>
            </View>
        </View>
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: 'rgb(250,250,250)',
              borderColor: '#7f8c8d',
              borderTopWidth: 0,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              padding: 10,}}>
              <Image source={creditCard} style={{width: 50, height: 40, resizeMode:'stretch'}} /> 
              <View style={{flexDirection: 'column', paddingLeft: 5, paddingTop: 1}}>
                <Text style={{
                  //paddingLeft: 5, paddingTop: 10,
                  color: '#bdc3c7'
                }}>{item.creditCardType}</Text>
                <View key={'v1-'+{index}}><Text style={{
                  //paddingLeft: 5, paddingTop: 10, 
                  color: '#bdc3c7'}}>{item.creditCardNumber}</Text></View>
              </View>
            </View>
        </TouchableOpacity>
    }
    />
    <FlatList 
    data={this.state.mortgage}
    style={{padding:15}}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item, index}) => 
        <TouchableOpacity 
        key={index}
        onPress={() => this.onAccountDetails(item)}
        style={styles.accountItem}>
        <View style={styles.accountItemInner}>
        <View style={styles.accountItemInnerRow}>
            <View>
            {/* 
              "_id": "5af2d5169dc279279cfe2a42",
10:37:29:     "accountInterestRate": 2.47,
10:37:29:     "accountType": 112,
10:37:29:     "advanceDate": "5/16/2016",
10:37:29:     "amountAdvanced": 6265,
10:37:29:     "amountGranted": 3824,
10:37:29:     "currentBalance": 17,--
10:37:29:     "customerId": "enipperhd",
10:37:29:     "grossOrNet": "Net",
10:37:29:     "interestBalance": 9630,--
10:37:29:     "openingBalance": 260,
10:37:29:     "openingBranch": "5 Ryan Junction",
10:37:29:     "openingDate": "3/7/2011",
10:37:29:     "principalBalance": 7228,
10:37:29:     "remainingProductTerm": 6,
10:37:29:     "repayment": 55,
10:37:29:     "totalProductTerm": 250,
10:37:29:     "twinAccount": true, 
*/}
              <View key={'1-'+{index}} style={{}}>
                <Text key={'2-'+{index}} style={{color: "#0f469e", fontSize: 20}}>Mortgage
                </Text>
                <View key={'v1-'+{index}}><Text key={'vt1-'+{index}} style={{color: '#bdc3c7'}}>{item._id.substring(item._id.length - 16, item._id.length)}</Text></View>
              </View>
            </View>
            <View style={{
              alignItems: 'flex-end'
                }}>
                <View key={'v2-'+{index}}><Text key={'vt2-'+{index}} style={{
                    fontSize: 16,
                    color: '#0f469e',
                }}>
                Current Balance: £{item.currentBalance}</Text></View>
                <View key={'v1-'+{index}}><Text key={'vt1-'+{index}} style={{color: '#bdc3c7'}}>Interest Balance: £{item.interestBalance}</Text></View> 
            </View> 
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
    spinner: {
      width: 100,
      height: 100,
    },
    accountItemCC: {
      backgroundColor: 'white',
      borderColor: 'rgb(95,155,216)',
      borderLeftWidth: 3,
      marginBottom: 10,
      borderRadius: 0,
    },
    accountItem: {
      backgroundColor: 'white',
      borderColor: 'rgb(201,123,84)', //2f73e0
      borderLeftWidth: 3,
      marginBottom: 10,
      borderRadius: 0,
    },
    accountItemInnerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 2,
    },
    accountItemInner: {
        borderColor: '#7f8c8d',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        padding: 15,
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
    