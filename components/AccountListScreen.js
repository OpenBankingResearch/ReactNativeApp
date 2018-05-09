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

export default class AccountListScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const params = navigation.state.params || {};
        return {
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
      userId: this.props.navigation.getParam('username'),
      creditCard: [
        {"_id":{"timestamp":1525856255,"machine":10338937,"pid":7660,"increment":4750997,"creationTime":"2018-05-09T08:57:35Z"},"customerId":"hhaytonci","creditCardNumber":3585459293787904,"creditCardType":"jcb","issueDate":"4/12/2017","expiryDate":"6/18/2021","maxLimit":29407,"cvv":260},
        {"_id":{"timestamp":1525856255,"machine":10338937,"pid":7660,"increment":4750997,"creationTime":"2018-05-09T08:57:35Z"},"customerId":"hhaytonci","creditCardNumber":3585459293787904,"creditCardType":"jcb","issueDate":"4/12/2017","expiryDate":"6/18/2021","maxLimit":29407,"cvv":260}
      ],
      mortgage: [
        {"_id":{"timestamp":1525856255,"machine":10338937,"pid":7660,"increment":4750997,"creationTime":"2018-05-09T08:57:35Z"},"customerId":"hhaytonci","creditCardNumber":3585459293787904,"creditCardType":"jcb","issueDate":"4/12/2017","expiryDate":"6/18/2021","maxLimit":29407,"cvv":260},
        {"_id":{"timestamp":1525856255,"machine":10338937,"pid":7660,"increment":4750997,"creationTime":"2018-05-09T08:57:35Z"},"customerId":"hhaytonci","creditCardNumber":3585459293787904,"creditCardType":"jcb","issueDate":"4/12/2017","expiryDate":"6/18/2021","maxLimit":29407,"cvv":260}
      ],
      accounts: [
        // {name: 'Credit Card', balance: '5600.45', sortCode: '05-23-81', accountNumber: '45367863', key: 1},
        // {name: 'Mortgage', balance: '560.45', sortCode: '05-23-81', accountNumber: '45367863', key: 2},
        // {name: 'Mortgage', balance: '560.45', sortCode: '05-23-81', accountNumber: '45367863', key: 3},
        // {name: 'Mortgage', balance: '560.45', sortCode: '05-23-81', accountNumber: '45367863', key: 4},
      ]
    };

    //console.log('UserId: ' + this.state.userId);

    this.onPressBack = this.onPressBack.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.onAccountDetails = this.onAccountDetails.bind(this);
    this.growAnimated = new Animated.Value(0);

    //this.getAccounts();
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

    //var DEMO_TOKEN = await AsyncStorage.getItem('token'); //STORAGE_KEY
    //console.log(DEMO_TOKEN);
    var url = "http://localhost:8082/mvp-dev/creditcard/" + 
    //this.state.userId; 
    'hhaytonci';
    console.log('GET request from ' + url);
    fetch(url, {
        method: "GET",
        headers: {
          //'userId': this.state.userId
        }
    })
    .then((response) => response.text())
    .then((responseData) => {
        //this.setState({transactions: responseData});
        console.log("response: " + responseData);
        //this.setState({accounts: responseData});
        //this.setState({creditCard: responseData});

    }).catch((error) => {
      console.log("error: " + error);
    })
    .done();
  }

  async getAccounts2() {
    //var DEMO_TOKEN = await AsyncStorage.getItem('token'); //STORAGE_KEY
    //console.log(DEMO_TOKEN);
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
                <Text key={'2-'+{index}} style={{color: "#0f469e", fontSize: 20}}>Credit card: {item.creditCardType}
                </Text>
                <View key={'v1-'+{index}}><Text key={'vt1-'+{index}} style={{color: '#bdc3c7'}}>{item.creditCardNumber}</Text></View>
                {/* <Text>{item.customerId}</Text> */}
                {/* <Text>{item.issueDate}</Text> */}
                {/* <Text>{item.expiryDate}</Text> */}
                {/* <Text>{item.cvv}</Text> */}
                {/* <Text>{item.maxLimit}</Text> */}
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
                {/* 
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
                }}>
                £{item.balance}</Text></View> 
            </View> */}
        </View>
        </TouchableOpacity>
    }
    />
    <FlatList 
    data={this.state.creditCard}
    style={{padding:15}}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item, index}) => 
        <TouchableOpacity 
        key={index}
        onPress={() => this.onAccountDetails(item)}
        style={styles.accountItem}>
        <View style={styles.accountItemInner}>
            <View>
              <View key={'1-'+{index}} style={{}}>
                <Text key={'2-'+{index}} style={{color: "#0f469e", fontSize: 20}}>Mortgage: {item.creditCardType}
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
                <View key={'v1-'+{index}}><Text key={'vt1-'+{index}} style={{color: '#bdc3c7'}}>Available: {item.maxLimit}</Text></View> 
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
    accountItemInner: {
        borderColor: '#7f8c8d',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
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
    