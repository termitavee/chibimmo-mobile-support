//default enter point, login and go to navigation block
//check if saved data and autologin if possible
//divide in activities and login
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Button,
  CheckBox,
  AsyncStorage

} from 'react-native';
import { TabNavigator } from 'react-navigation';

import { resetStack } from './data/utils'
import { setUser, setIP, IP } from './data/db'

export default class LogIn extends Component {

  constructor(props) {
    super(props)
    const { navigation } = props

    this.state = {
      user: 'root',
      pass: 'root',
      remember: props.remember || false,
      serverIP: '192.168.1.144'
    }

    AsyncStorage.getItem(IP, (error, found) => {
      console.log(found)
      if (found) this.setState({ serverIP: JSON.parse(found) })
    })
    console.log('========== login.js - constructor - getIP(this) ==========')


    this.logInButton = this.logInButton.bind(this)

  }

  logInButton = function (event) {

    console.log('========== login.js - button - state ==========')

    const { user, pass, remember } = this.state
    const { navigation } = this.props
    //TODO check empty fields
    //TODO check and do fetch to the server termitavee.ddns.net:3000

    fetch('http://' + this.state.serverIP + ':3000/logIn',
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ user, pass, remember })
      }).then(res => res.json())
      .then((res) => {
        console.log('got Reasponse')
        setIP(this.state.serverIP)
        console.log('ip saved')
        //setRootNav(navigation)
        if (res.status == 202) {

          //TODO if remember, save it this.saveUser(res.user)

          setUser(res.user)

          console.log('ip saved')
          navigation.dispatch(resetStack('App'))

        } else {
          switch (res.error) {
            case 'user':
              //TODO show there is a problem with the user
              break
            case 'password':
              //TODO show there is a problem with the password
              break
            default:
            //TODO another error
          }
        }

      }).catch((error) => {
        //if bad use?
        console.warn(error);

      })
  }

  render() {
    console.log('==========  login.js - render - this.props and state========== ')
    //props [ 'screenProps', 'navigation' ]
    //state [ 'user', 'pass', 'remember', 'serverIP' ]
    console.log(Object.keys(this.props))
    console.log(this.props.screenProps)
    //console.log(Object.keys(this.state))
    return (
      <View>
        <View>
          <Text>UserName</Text>
          <TextInput
            placeholder="Type your user name"
            autoFocus={true}
            onChangeText={(user) => this.setState({ user })}
            value={this.state.user}
          />
          <Text>Password</Text>
          <TextInput
            placeholder="Type your password"
            secureTextEntry={true}
            onChangeText={(pass) => this.setState({ pass })}
            value={this.state.pass}
          />
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              onValueChange={(remember) => this.setState({ remember })}
            />
            <Text>remember</Text>
          </View>
          <Button
            onPress={this.logInButton}
            title="Log In"
          />
        </View>
        <Text>Server url or ip</Text>
        <TextInput
          placeholder="server"
          onChangeText={(serverIP) => this.setState({ serverIP })}
          value={this.state.serverIP}
        />

        <Text>more info</Text>
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
