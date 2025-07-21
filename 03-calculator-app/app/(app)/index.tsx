import { ThemeButton } from "@/components/ThemeButton";
import ThemeText from "@/components/ThemeText";
import { globalStyles } from "@/styles/global-styles";
import React, { useState } from "react";
import { View } from "react-native";

const CalculatorApp = () => {
  // Create a result variable to store the result of the operation
  const [result, setResult] = useState(0);

  // Create an array of button data to render buttons dynamically
  const buttonsNumbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "+", "-", "*", "/", "=", "C"];

  return (
    // Main container for the calculator app
    <View style={globalStyles.calculatorContainer}>

      {/* This is the main screen of the calculator app */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <ThemeText variant="h1">50 x 50</ThemeText>
        <ThemeText variant="h2">2500</ThemeText>
      </View>

      {/* This is the buttons container of the calculator app */}
      <View style={globalStyles.row}>
        {/* Iterate over an array of button numbers to create buttons dynamically*/}
          {buttonsNumbers.map((buttonInfo) => (
            <ThemeButton key={buttonInfo} buttonNumber={buttonInfo} />
          ))}
      </View>
    </View>
  );
};

export default CalculatorApp;
