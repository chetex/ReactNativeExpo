import { globalStyles } from '@/styles/global-styles';
import React from 'react';
import { Pressable, Text } from 'react-native';

interface ThemeButtonProps {
  // Define any props you want to pass to the ThemeButton component
  buttonNumber?: String | number;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({ buttonNumber }) => {
  return (
    <Pressable style={globalStyles.themeButton} onPress={() => console.log(buttonNumber)}>
        <Text style={globalStyles.buttonText}>{buttonNumber}</Text>
    </Pressable>
  );
}
// This component is a button that can be used in the calculator app.