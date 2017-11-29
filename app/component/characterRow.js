
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export const Row = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {props}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',

  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
