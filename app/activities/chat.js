//connect to the server and get messages to the user

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ListView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SocketIO from 'socket.io-client';
import Row from '../component/chatRow';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to chat screen'
  };

  constructor(props) {
    super(props);

    const socket = SocketIO('http://localhost:3000')

    socket.on('message', (message) => {
      const { messages, dataSource} = this.state;
      // React will automatically rerender the component when a new message is added.

      const newMessages = oldMessages.concat([message])
      this.setState({
        messages: newMessages,
        dataSource: dataSource.cloneWithRows(newMessages)
      });

    });
    //TODO send user to server
    const messages = [{ user: 'Admin', content: 'Welcome to the chat' }]
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      socket,
      sendMessage: "",
      messages,
      dataSource: ds.cloneWithRows(messages),
    }
  }

  send = () => {
    //TODO get text and send
    const { socket, sendMessage } = this.state
    
    socket.emit('message',sendMessage)

  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data}/>}
        />

        <View style={styles.sendBox}>

          <TextInput
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
  sendBox: {
    flexDirection: 'row',
  },
});
