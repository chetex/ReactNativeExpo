import { Colors } from '@/constants/Colors';
import React from 'react';
import { Text, View } from 'react-native';

const CalculatorApp = () => {
  return (
    <View>
      {/* This is the main screen of the calculator app */}
      <Text style={{ fontSize: 24, fontFamily: 'SpaceMono', color: Colors.orange }}>Calculator app</Text>
    </View>
  )
}

export default CalculatorApp