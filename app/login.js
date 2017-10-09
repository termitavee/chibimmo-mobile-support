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
  CheckBox
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import {resetStack as redirect} from './data/utils'

//import views from activities
import App from './app';

//navigate('App')

//login successfully? redirect app : redirect login

export default class LogIn extends Component{

  constructor(props){
    super(props)
    const { navigation } = props


    this.state = {
      navigation,
      user: '',
      pass: '',
      remember: props.remember || false
    }

    this.logInButton = this.logInButton.bind(this)

  }
  logInButton = function (event){
    console.log(this.state.navigation)
    const { user, pass} = this.state
    const { navigation } = this.props

    //TODO do fetch to the server
    redirect(navigation, 'App')
  }

  render() {
    //ActivityIndicator
    //Button
    //Text
    //TextInput
    //View
    return (
      <View>
        <View>
          <Text>UserName</Text>
          <TextInput
            placeholder="Type your user name"
            autoFocus={true}
            onChangeText={(user) => this.setState({user})}
          />
          <Text>Password</Text>
          <TextInput
            placeholder="Type your password"
            secureTextEntry={true}
            onChangeText={(pass) => this.setState({pass})}
          />
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              onValueChange={(remember)=>this.setState({remember})}
              />
              <Text>remember</Text>
          </View>
          <Button
            onPress={this.logInButton}
            title="Log In"
          />
        </View>

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
