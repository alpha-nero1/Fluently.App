import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { BottomSheetDelegate } from "~/components/core/layout/bottomSheetModal/bottomSheetDelegate/bottomSheetDelegate";
import { usePurchases } from "~/lib/hooks/usePurchases";
import { StoreProvider } from "~/lib/state/storeProvider";

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