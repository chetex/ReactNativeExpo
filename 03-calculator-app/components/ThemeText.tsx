import { globalStyles } from '@/styles/global-styles';
import React from 'react';
import { Text, TextProps } from 'react-native';

// Add ThemeText typescript accept children prop
interface ThemeTextProps extends TextProps {
  children?: React.ReactNode;
  variant?: 'h1' | 'h2';
}

const ThemeText: React.FC<ThemeTextProps> = ({ children, variant }) => {
  return (
    <Text
      style={[
        globalStyles.themeText,
        variant === 'h1' && globalStyles.mainOperation,
        variant === 'h2' && globalStyles.mainResult,
      ]} // You can add more styles here if needed, 
    >
      {children}
    </Text>
  );
}

export default ThemeText