//https://realm.io/docs/javascript/latest/
//let realm = new Realm({schema: [PersonSchema, CarSchema]});
/* import Realm from 'realm'

import schema from './schema'

let realm = new Realm({schema})

export const LogInDataBase ={

  previousLogIn: function(){
    //use realm to get user, if valid retun data, if not, return false
    
    return false;
  }
}

export const AnotherDataBase = {

}
 */

//TODO all database comunication

/*
SAVE
JSON.stringify(false)
try {
 await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
} catch (error) {
 // Error saving data
}
LOAD
 JSON.parse(value)
try {
 const value = await AsyncStorage.getItem('@MySuperStore:key');
 if (value !== null){

 }
} catch (error) {
 // Error retrieving data
}

 
*/
import { AsyncStorage } from 'react-native';
export function setUser(user) {

  AsyncStorage.setItem('user', JSON.stringify(user), (error) => {
    if (error == null)
      console.log('saved')
    else
      console.log(error)

  });

}

export function getUser() {

  AsyncStorage.getItem('user', (error, found) => {
    if (found) {
      console.log('found')
      return JSON.parse(found)

    } else
      console.log(error)


  });

}
export function setIP(ip) {

  AsyncStorage.setItem('ip', JSON.stringify(ip), (error) => {
    if (error == null)
      console.log('saved')
    else
      console.log(error)

  });

}

export function getIP() {

  AsyncStorage.getItem('ip', (error, found) => {
    if (found) {
      console.log('found')
      return JSON.parse(found)

    } else
      console.log(error)


  });
}