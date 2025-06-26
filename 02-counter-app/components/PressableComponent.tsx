import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

// Define the type for the props of the PressableComponent
// It extends PressableProps to include all the properties of a Pressable component
interface PressableComponentProps extends TouchableOpacityProps {
  children: React.ReactNode; 
}

// Styles can be defined here or imported from a separate file
export default function PressableComponent(props: PressableComponentProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7} // Optional: Adjust the opacity when pressed
      {...props}
    >
      {props.children}
    </TouchableOpacity>
  );
}