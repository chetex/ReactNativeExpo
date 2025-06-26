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

      <PressableComponent onPress={() => setCount(count + 1)}>
        <Text>Increment</Text>
      </PressableComponent>

      <PressableComponent onPress={() => setCount(count - 1)}>
        <Text>Decrement</Text>
      </PressableComponent>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textHuge: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'red',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 60,
    height: 60
  },
});
