import { StackNavigator, TabNavigator } from 'react-navigation'
import MainScreen from '../screens/main'
import ChatScreen from '../screens/chat'
import MiniGameScreen from '../screens/miniGame'
import optionsScreen from '../screens/options'

import Splash from '../splash'
import LogIn from '../login'

/* const navigationOptions = ({ navigation }) => ({
  headerMode: 'none',
  header: null
}) */

const AppStack = TabNavigator({
  Home: { screen: MainScreen },
  Chat: { screen: ChatScreen },
  Game: { screen: MiniGameScreen },
  Options: { screen: optionsScreen }
})

export const SplashStack = StackNavigator({
  LogIn: { screen: LogIn },
  App: { screen: AppStack },
}, {
    navigationOptions: {
      headerMode: 'none',
      header: null
    }
 });


