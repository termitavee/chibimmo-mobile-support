//welcome screen, news and account main data
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { getUser, USER } from '../data/db'
import {Row} from '../component/characterRow';

export default class App extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      user: {},
      dataSource: ds.cloneWithRows([]),
    } 

    AsyncStorage.getItem(USER, (error, found) => {

      console.log('========== main.js - getUser - characters ==========')
      const parseFound = (JSON.parse(found))
      console.log(parseFound)

      console.log('========== main.js - getUser - this.state ==========')

      if (found) {
        this.setState({ user: parseFound })
        console.log('saved user  ')
        const { dataSource } = this.state
        this.setState({
          user: parseFound,
          dataSource: dataSource.cloneWithRows(parseFound.characters)
        }) 
      

      } else {
        //TODO if not valid do something. Redirect(?)
      }
    })
  }

  render() {
    const {_id } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome {_id}
        </Text>

        <ListView
          enableEmptySections={true}   
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
        />
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
