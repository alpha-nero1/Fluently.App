import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { BottomSheetDelegate } from "~/components/core/layout/bottomSheetModal/bottomSheetDelegate/bottomSheetDelegate";
import { StoreProvider } from "~/lib/state/storeProvider";

// This is the default configuration
configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false
});

export default function RootLayout() {
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
        <StatusBar style="dark" />
      </>
    );
  }