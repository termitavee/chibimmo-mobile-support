import { AppRegistry } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import Splash from './app/splash';
import App from './app/app';
import LogIn from './app/login';

const navigationOptions = ({navigation})=>({
  headerMode: 'none',
  header: null
})

const SplashStack = StackNavigator({
  Splash: { screen: Splash, navigationOptions},
  LogIn: { screen: LogIn, navigationOptions },
  App: { screen: App, navigationOptions },
});

AppRegistry.registerComponent('chibimmoMobileSupport', () => SplashStack);
