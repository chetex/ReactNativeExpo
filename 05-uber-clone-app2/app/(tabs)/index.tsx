import { HelloWave } from "@/components/hello-wave";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-yellow-500">
        Welcome to Nativewind Nacho! <HelloWave />
      </Text>
      <StatusBar style="auto" /> 
    </SafeAreaView>
  );
}
