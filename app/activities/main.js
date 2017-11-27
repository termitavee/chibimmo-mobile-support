//welcome screen, news and account main data
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ListView
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { getUser } from '../data/db'
import Row from '../component/characterRow';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to the main screen'
  };
  constructor(props) {
    super(props.screenProps)
    console.log('========== main.js - constructor - this ==========')
    console.log(props)
    //const user =  getUser()
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows([]),
    }

    console.log('========== main.js - getUser ==========')
    console.log(getUser())
    /*   .then(function (user, error) {
      console.log(user)
      console.log(error)
      this.setState({
        user
      });
      this.state.dataSource.cloneWithRows(user.characters) 
    })  */
    //TODO if not valid do something

  }

  render() {
    console.log('========== main.js - constructor - this ==========')

    return (
      <View style={styles.container}>        
        <Text style={styles.welcome}>
          print user information and news
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
        />
      </View>
    );
  }
}


export default class App extends Component<{}> {
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
