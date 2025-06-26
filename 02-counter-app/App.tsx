import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import PressableComponent from './components/PressableComponent';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      {/* Text strings */}
      <Text style={styles.textHuge}>{count}</Text>

      <PressableComponent 
        onPress={() => setCount(count + 1)}
        onLongPress={() => setCount(0)}
        style={[styles.container, styles.positionRight]}>
        <Text>Increment</Text>
      </PressableComponent>

      <PressableComponent 
        onPress={() => setCount(count - 1)}
        onLongPress={() => setCount(-1)}
        style={[styles.container, styles.positionLeft]}>
        <Text>Decrement</Text>
      </PressableComponent>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },

  textHuge: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },

  positionRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },

  positionLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});
