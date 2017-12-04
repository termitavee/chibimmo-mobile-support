//manage options of the app

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { resetStack } from '../data/utils'
import { setUser, setIP, IP } from '../data/db'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serverIP: ''
    }

    AsyncStorage.getItem(IP, (error, found) => {

      console.log('========== options.js - AsyncStorage - getIP ==========')
      console.log(found)
      if (found) this.setState({ serverIP: JSON.parse(found) })
    })
  }
  exit = () => {
    this.props.navigation.dispatch(resetStack('LogIn'))
  }

  save = () => {
    setIP(this.state.serverIP)
  }
//[styles.row, styles.right ]
  render() {
    return (
      <View style={styles.container}>
        
        <View style={[styles.row, styles.right]}>
          <Button
            title="Log Out"
            onPress={this.exit}
          />
        </View>

        <View style={styles.row}>
          <Text style={{ textAlignVertical: 'center'}}>
            Change server'server IP
        </Text>
          <TextInput
            style={{ height: 40 }}
            autoCorrect={false}
            maxLength={15}
            onChangeText={(serverIP) => this.setState({ serverIP })}
            onBlur={this.save}
            value={this.state.serverIP}
          />
        </View>

        <View style={[styles.row, styles.center]}>
          <Button
            title="Save"
            onPress={this.save}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,    
    backgroundColor: '#F5FCFF',
  },
  row: {
    paddingTop:5,
    flexDirection: 'row',
  },
  right: {
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },

});
