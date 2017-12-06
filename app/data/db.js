import { AsyncStorage } from 'react-native';

export const USER = '0'
export const IP = '1'
export const REMEMBER = '2'


export function setUser(user) {

  AsyncStorage.setItem(USER, JSON.stringify(user), (error) => {
    if (error == null)
      console.log('user saved')
    else
      console.log(error)

  });

}

export function setremember(remember) {

  AsyncStorage.setItem(REMEMBER, JSON.stringify(remember), (error) => {
    if (error == null)
      console.log('user saved')
    else
      console.log(error)

  });

}

export function setIP(ip) {

  AsyncStorage.setItem(IP, JSON.stringify(ip), (error) => {
    if (error == null)
      console.log('ip saved')
    else
      console.log(error)

  });

}

