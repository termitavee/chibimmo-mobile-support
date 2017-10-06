//divide in activities and login
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabNavigator } from 'react-navigation';
//import views from activities
import MainScreen from './activities/main';
import ChatScreen from './activities/chat';
import MiniGameScreen from './activities/miniGame';
import optionsScreen from './activities/options';




const SimpleApp = TabNavigator({
  Home: { screen: MainScreen },
  chat: { screen: ChatScreen },
  game: { screen: MiniGameScreen },
  options: { screen: optionsScreen }
});


export default class App extends Component<{}> {
  render() {
    return (
      <SimpleApp />
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
