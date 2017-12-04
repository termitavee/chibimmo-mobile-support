//statics generic functions
import { NavigationActions } from 'react-navigation';

export const resetStack = (routeName) => {

  return (NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  }))
}

export const formatMap = (param) => {
  switch (param) {
    case 0:
      return "";
    case 1:
      return "default";
    case 2:
      return "";
    default:
      return "Some testing area";
  }

}

export const formatOrientation = (param) => {

  switch (param) {
    case "0":
      return "Offensive";
    case "1":
      return "Defensive";
    case "2":
      return "Neutral";
  }

}

export const formatType = (param) => {

  switch (param) {
    case "0":
      return "Soldier";
    case "1":
      return "Mage";
    case "2":
      return "Rogue";
  }

}

export const formatDate = (param) => {
  const started = new Date(param);

  return (
    started.getDate() +
    "/" +
    (1 + started.getMonth()) +
    "/" +
    started.getFullYear()
  );  
}

export const formatEquipment = (param) => {

  switch (param) {
    case "0":
      return "";
    case "1":
      return "";
    case "2":
      return "";
    default:
      return "Nothing";

  }
}
/* resetStack = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName, params })]
}) */

