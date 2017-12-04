import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ListView,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SocketIO from 'socket.io-client';
import { Row } from '../component/chatRow';
import { IP, USER } from '../data/db'

export default class App extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      user: {},
      socket: {},
      message: {},
      sendMessage: "",
      dataSource: ds.cloneWithRows([]),
    }
    AsyncStorage.getItem(USER, (error, found) => {
      
      this.setState({ user: JSON.parse(found) })
    })
    AsyncStorage.getItem(IP, (error, found) => {

      const socket = SocketIO(
        'http://' + JSON.parse(found) + ':3000/chat',
        {
          pingTimeout: 30000,
          allowUpgrades: false,
          cookie: false
        })

      socket.on('connect', () => {
        console.log('chat conection')
        const messages = [{ user: 'Admin', content: 'Welcome to the chat' }]
        //TODO this.updateDataSource
        this.setState({
          messages,
          dataSource: this.state.dataSource.cloneWithRows(messages)
        })
      })

      socket.on('newMessage', (message) => {
        console.log('new message')
        console.log(message)
        const { messages, dataSource } = this.state;

        const newMessages = [...messages, message]
        this.setState({
          messages: newMessages,
          sendMessage:"",
          dataSource: dataSource.cloneWithRows(newMessages)
        })

      })

      this.setState({ socket })
    })

    this.send = this.send.bind(this);


  }

  updateDataSource(newMessages) {
    const { messages, dataSource } = this.state;
    const updated = [...messages, newMessages]
    this.setState({
      messages: updated,
      dataSource: dataSource.cloneWithRows(newMessages)
    })
  }

  send = () => {
    
    const { messages, dataSource, sendMessage, user, socket } = this.state;
    console.log('========== chat.js - send - this.state.user ==========')
    console.log(user)
    const message = { user: user._id, content: sendMessage }
    console.log(message)
    const newMessages = [...messages, message]
    this.setState({
      messages: newMessages,
      dataSource: dataSource.cloneWithRows(newMessages)
    })
    socket.emit('message', message)

  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Row {...rowData} />}
        />

        <View style={styles.sendBox}>

          <TextInput
            style={styles.allWidth}
            onChangeText={(sendMessage) => this.setState({ sendMessage })}
            value={this.state.sendMessage}
          />
          <Button
            title="Send"
            onPress={this.send}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* justifyContent: 'center', */
    /* alignItems: 'center', */
    backgroundColor: '#F5FCFF',
  },
  messagesBox: {
    flex: 1
  },
  sendBox: {
    flexDirection: 'row',
  },
  allWidth: {
    flex: 1
  }
});
