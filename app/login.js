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

import { resetStack as redirect } from './data/utils'
import { setUser, setIP, IP } from './data/db'
//import views from activities
import App from './app';

//navigate('App')

export default class LogIn extends Component {

  constructor(props) {
    super(props)
    const { navigation } = props

    this.state = {
      navigation,
      user: 'root',
      pass: 'root',
      remember: props.remember || false,
      serverIP: '127.0.0.1'
    }

    AsyncStorage.getItem(IP, (error, found) => {
      if (!error) this.setState({ serverIP: JSON.parse(found) })
    })
    console.log('========== login.js - constructor - getIP(this) ==========')


    this.logInButton = this.logInButton.bind(this)

  }
  logInButton = function (event) {

    console.log('========== login.js - button - state ==========')
    console.log(this.state)
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
        if (res.status == 202) {

          //TODO if remember, save it this.saveUser(res.user)

          setUser(res.user)
          redirect(navigation, 'App', { navigation, ...res.user })

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
