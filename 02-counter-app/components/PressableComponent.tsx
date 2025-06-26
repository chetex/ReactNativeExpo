import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { StyleSheet } from 'react-native';

// Define the type for the props of the PressableComponent
// It extends PressableProps to include all the properties of a Pressable component
interface PressableComponentProps extends PressableProps {
  children: React.ReactNode; 
}

// Styles can be defined here or imported from a separate file
export default function PressableComponent(props: PressableComponentProps) {
  return (
    <Pressable
      {...props}
    >
      {props.children}
    </Pressable>
  );
}