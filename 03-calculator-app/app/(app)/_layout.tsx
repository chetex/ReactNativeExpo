import { Colors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
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
    <View style={{ flex: 1, backgroundColor: Colors.backGround, padding: 20 }}>
      <Slot />
    </View>
  )
}
export default RootLayout