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
import { TabNavigator } from 'react-navigation'
import DeviceInfo  from 'react-native-device-info'

import { resetStack } from './data/utils'
import { setUser, setIP, IP, setremember } from './data/db'

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

      console.log('========== login.js - constructor - getIP(this) ==========')
      console.log(found)
      if (found) this.setState({ serverIP: JSON.parse(found) })
    })


    this.logInButton = this.logInButton.bind(this)

  }

  logInButton = function (event) {

    console.log('========== login.js - button - state ==========')

    const { user, pass, remember, serverIP } = this.state
    console.log(serverIP)
    const { navigation } = this.props
    //TODO check empty fields
    //TODO check and do fetch to the server termitavee.ddns.net:3000

    fetch('http://' + serverIP + ':3000/logIn',
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ user, pass, remember })
      }).then(res => res.json())
      .then((res) => {
        console.log('========== login.js - fetch - res.user ==========')
        setIP(this.state.serverIP)
        //setRootNav(navigation)
        if (res.status == 202) {

          //TODO if remember, save it this.saveUser(res.user)
          if (remember) {
            //{user, token, device}
            const device = DeviceInfo.getUniqueID()	
            setremember({user: user._id, token, device})
          }
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
