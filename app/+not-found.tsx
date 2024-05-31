import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex items-center justify-center p-5">
        <Text className="text-xl font-bold">This screen {"doesn't"} exist.</Text>

        <Link href="/" className="mt-4 py-4">
          <Text className="text-sm font-bold text-[#2e78b7]">
            Go back to the home screen
          </Text>
        </Link>
      </View>
    </>
  );
}
