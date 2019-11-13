import React, { Component } from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
import { Icon } from "@up-shared/components";


export default class MapPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
            <Icon name="store" size={150} color="black"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
