import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import { formatMap, formatOrientation, formatType, formatDate, formatEquipment } from '../data/utils'

export const Row = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {props._id} {console.log(props)}
    </Text>
    <View>
      <Text style={styles.text}>
      location {formatMap(props.map)},
      orientation {formatOrientation(props.orientation)},
      class {formatType(props.type)},
      created {formatDate(props.started)},
      equipment {formatEquipment(props.equipment)}
      </Text>  
    </View>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',

  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
});
