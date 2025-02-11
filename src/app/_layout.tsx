import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { BottomSheetDelegate } from "~/components/core/layout/bottomSheetModal/bottomSheetDelegate/bottomSheetDelegate";
import { usePurchases } from "~/lib/hooks/usePurchases";
import { StoreProvider } from "~/lib/state/storeProvider";
// Sending verification codes with cognito fails without this:
import "react-native-get-random-values";
import { useEffect } from "react";
import { Alert } from 'react-native';

// This is the default configuration
configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false
});

export default function RootLayout() {
    const theme = useColorScheme();
    usePurchases();
    const statusTheme = (
        theme === 'dark'
        ? 'light'
        : 'dark'
    );

    useEffect(() => {
      if (!global.crypto || !global.crypto.getRandomValues) {
          Alert.alert("Crypto API is missing!", "Something is wrong with the polyfill.");
      } else {
          console.log("✅ Crypto API is available!");
      }
    })

    return (
      <>
        <StoreProvider>
            <Stack>
                <Stack.Screen name="/" options={{ headerShown: false }} />
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
                <Stack.Screen name="auth/login/index" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <BottomSheetDelegate />
        </StoreProvider>
        <Toast />
        <StatusBar style={statusTheme} />
      </>
    );
  }