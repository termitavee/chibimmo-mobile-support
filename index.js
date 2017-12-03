import { AppRegistry } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { SplashStack } from './app/data/router'

AppRegistry.registerComponent('Chibimmo', () => SplashStack);
