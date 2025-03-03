import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import TabNavigation from "./Navigator/TabNavigation";
import { useColorScheme } from '@/hooks/useColorScheme';

import react, { useEffect, useState} from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./Global.css";
import { Provider, useDispatch } from "react-redux";
import store from "./GlobalState/store";
import { SetUserData } from "./GlobalState/UserSlice";
import Header from "./components/Header";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const setStore = async () => {
  try {
    const storedWssc = await AsyncStorage.getItem("wssc");
    const wssc = JSON.parse(storedWssc);
    setWssc(wssc);
    const storedUser = await AsyncStorage.getItem("user");
    const user = JSON.parse(storedUser);
    setUser(user);
    const storedToken = await AsyncStorage.getItem("token");
    const token = JSON.parse(storedToken);

    useDispatch(SetUserData(user, wssc, token));
  } catch (error) {}
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    setStore();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="+not-found" />
    //   </Stack>
    // </ThemeProvider>
    <Provider store={store}>
    <SafeAreaProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    </SafeAreaProvider>
  </Provider>
  );
}
