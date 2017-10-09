//statics generic functions
import {  NavigationActions } from 'react-navigation';

resetStack = (navigation, routeName, params) =>{

  navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  }))
}




export {resetStack}
