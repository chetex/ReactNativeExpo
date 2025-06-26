import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { StyleSheet } from 'react-native';

// Define the props for the PressableComponent
interface PressableComponentProps extends PressableProps {
  children: React.ReactNode; 
}

// Create a functional component that uses Pressable
export default function PressableComponent(props: PressableComponentProps) {
  return (
    <Pressable
      {...props}
      style={styles.container}
    >
      {props.children}
    </Pressable>
  );
}

// Define styles for the PressableComponent
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});