//welcome screen to show while checks if goes to login or app

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Button,
  Image,
  AsyncStorage
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

//import necesary data
import { REMEMBER } from './data/db'
import { resetStack } from './data/utils'

export default class Splash extends Component {

  constructor(props) {
    super(props)
    this.checkUser(props)
  }
  async checkUser(props) {
    const { navigation } = props
    //get language from storange and save for etenity
    AsyncStorage.getItem(REMEMBER, (tokenFound) => {
      //tokenFound = {user, token, device, date}
      if (!tokenFound)
        navigation.dispatch(resetStack('LogIn'))
      else {
        AsyncStorage.getItem(IP, (error, serverIP) => {

          if (serverIP) {
            fetch('http://' + JSON.parse(serverIP) + ':3000/logIn',
              {
                method: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify({ ...(JSON.parse(tokenFound)), remember: true })
              }).then(res => res.json())
              .then((res) => {
                console.log('========== login.js - fetch - res.user ==========')
                //setRootNav(navigation)
                if (res.status == 202) {

                  //TODO if remember, save it this.saveUser(res.user)

                  setUser(res.user)
                  console.log('ip saved')
                  navigation.dispatch(resetStack('App'))

                } else {
                  navigation.dispatch(resetStack('LogIn'))

                }

              }).catch((error) => {
                navigation.dispatch(resetStack('LogIn'))
              })
          }
        })
      }
    })

  }

  render() {
    return (
      <View>
        {/*  <Image source={require('./img/icon.jpg')} style={{width: 320, height: 320}} /> */}
        <ActivityIndicator />
        <Text>Loading app</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
