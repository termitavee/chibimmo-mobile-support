//statics generic functions
import { NavigationActions } from 'react-navigation';

export const resetStack = (routeName) => {

  return (NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  }))
}
/* resetStack = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName, params })]
}) */

