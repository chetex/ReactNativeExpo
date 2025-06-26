import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import PressableComponent from './components/PressableComponent';

export default function App() {
  const [count, setCount] = useState(0);

  {/* Define an array of button configurations, each with its own ID, label, and actions */}
  const buttonsConfig = [
    {
      id: 'decrementButton',
      label: 'Decrement',
      onPressAction: () => setCount(prevCount => prevCount - 1),
      onLongPressAction: () => setCount(-1),
    },
    {
      id: 'incrementButton',
      label: 'Increment',
      onPressAction: () => setCount(prevCount => prevCount + 1),
      onLongPressAction: () => setCount(0),
    },
  ];

  return (
    <View style={styles.appContainer}>
      <Text style={styles.textHuge}>{count}</Text>

      <View style={styles.buttonContainer}>
        {/* Iterate over the buttonsConfig array to render each button */}
        {buttonsConfig.map(button => (
          <PressableComponent 
            key={button.id}
            onPress={button.onPressAction}
            onLongPress={button.onLongPressAction}
            style={styles.button}>
            <Text>{button.label}</Text>
          </PressableComponent>
        ))}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#34495e',
    justifyContent: 'flex-end',
    padding: 20,
  },

  textHuge: {
    fontSize: 80,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    alignContent: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  button: {
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '45%',
  },
});