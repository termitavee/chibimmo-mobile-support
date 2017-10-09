//https://realm.io/docs/javascript/latest/
//let realm = new Realm({schema: [PersonSchema, CarSchema]});
import Realm from 'realm'

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
