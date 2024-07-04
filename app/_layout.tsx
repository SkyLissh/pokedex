import "@/global.css";

import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

cssInterop(Image, { className: "style" });
cssInterop(BottomSheetScrollView, { className: "contentContainerStyle" });
cssInterop(StatusBar, {
  className: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: true,
    },
  },
});

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const urqlClient = new Client({
  url: "https://beta.pokeapi.co/graphql/v1beta",
  exchanges: [cacheExchange, fetchExchange],
});

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider value={urqlClient}>
        <GestureHandlerRootView className="grow" onLayout={onLayoutRootView}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <Slot />
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
}
