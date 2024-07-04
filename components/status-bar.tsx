import type { StatusBarStyle } from "react-native";
import { StatusBar as RNStatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  className?: string;
  barStyle?: StatusBarStyle;
};

export function StatusBar({ className, barStyle = "light-content" }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View className={className} style={{ height: insets.top }}>
      <RNStatusBar className={className} barStyle={barStyle} />
    </View>
  );
}
