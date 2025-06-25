import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  // Create counter using useState
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.textHuge}>{count}</Text>

      // Create a button to increment the counter
      <Pressable
        style={styles.floatingButton}
        onPress={() => setCount(count + 1)}
      >
        <Text style={{ color: 'white', fontSize: 24, alignContent: "center" }}>+1</Text>
      </Pressable>

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

  // Move the button to the bottom of the screen
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
    height: 60, 
  },
});
