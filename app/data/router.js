import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation'

import MainScreen from '../screens/main'
import ChatScreen from '../screens/chat'
import MiniGameScreen from '../screens/miniGame'
import OptionsScreen from '../screens/options'

import Splash from '../splash'
import LogIn from '../login'

//routes names
export const LOGIN = 'LogIn'
export const APP = 'App'

const AppStack = TabNavigator({
  Home: { screen: MainScreen },
  Chat: { screen: ChatScreen },
  Game: { screen: MiniGameScreen },
  Options: { screen: OptionsScreen }
})

export const SplashStack = StackNavigator({
  LogIn: { screen: LogIn },
  App: { screen: AppStack },
}, {
    navigationOptions: {
      headerMode: 'none',
      header: null
    }
  }
);

export const resetStack = (routeName) => {

  return (NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  }))
}


