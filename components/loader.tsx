import LottieView from "lottie-react-native";
import { View } from "react-native";

export function Loader() {
  return (
    <View className="flex h-full w-full flex-col items-center justify-center">
      <LottieView
        autoPlay
        loop
        source={require("@/assets/animations/pokeball-loader.json")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}
