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
  Image
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

//import necesary data
import {LogInDataBase as db} from './data/db'
import {resetStack as redirect} from './data/utils'

//import views from activities
import App from './app';
import LogIn from './login';

const SplashStack = StackNavigator({
  LogIn: { screen: LogIn },
  App: { screen: App },
});

export default class Splash extends Component{
  static navigationOptions = {
    drawerLabel: 'Splash.js',
    title: 'Splash.js',
  }

  constructor(props){
    super(props)
    //this.checkUser()
  }

  async checkUser(){
    const {navigation} = this.props
    //get language from storange and save for etenity

    //user in local db? fetch server : redirect login
    const token = db.previousLogIn()

    if(token){
      //TODO do fetch to server with token
      redirect(navigation, 'App')

    }

    redirect(navigation, 'LogIn')
    /*navigation.navigate('LogIn', {navigation}, NavigationActions.reset({
      index: 0,
      actions: NavigationActions.navigate({ routeName: 'LogIn'})
    }))
*/
  }
  componentDidMount(){
    this.checkUser()
  }

  render() {
    return (
      <View>
        <Image source={require('./img/icon.jpg')} style={{width: 320, height: 320}} />
        <ActivityIndicator/>
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
