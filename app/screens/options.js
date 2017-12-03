//manage options of the app

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { resetStack as redirect } from '../data/utils'

class HomeScreen extends React.Component {

  exit = () => {
    //TODO StackNavigator.goBack()
    console.warn('exit?')
    console.log(this.props)
    //redirect(navigation, 'App')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Log Out"
          onPress={this.exit}
        />
        <Text style={styles.welcome}>
          show options (notifications and stuff)
        </Text>
        {/* 
        server ip
         */}
      </View>
    );
  }
}


export default class App extends Component {
  render() {
    return (
      <HomeScreen />
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
