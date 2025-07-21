import { globalStyles } from '@/styles/global-styles';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

const RootLayout = () => {
  // Add space mono font with useFonts
  const [fontsLoaded] = useFonts({
     SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Wait for fonts to load before rendering the layout
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={ globalStyles.viewContainer }>
      <Slot />

      <StatusBar style="light" /> 
    </View>
  )
}
export default RootLayout