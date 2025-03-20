import React, { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { BottomSheetDelegate } from '~/components/core/layout/bottomSheetModal/bottomSheetDelegate/bottomSheetDelegate';  // Adjust path
import { Screens } from '~/lib/types/enums/Screens';
import LoginScreen from './auth/login/login';
import RegisterScreen from './auth/register/registerScreen';
import MainScreen from './main/main';
import { StoreProvider } from '~/lib/state/storeProvider';
import Purchases from 'react-native-purchases';
import { RevenueCat } from '~/lib/constants/settings';
import { AsyncStorageUtils } from '~/lib/utils/asyncStorageUtils';
import { PersistableKeys } from '~/lib/state/stores/settingsStore';

// This is the default configuration for reanimated
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// Stack Navigation setup
const Stack = createStackNavigator();

Purchases.configure({
  appUserID: 'test@fluently.com.au',
  apiKey: Platform.OS === 'ios' 
      ? RevenueCat.IosApiKey 
      : RevenueCat.AndroidApiKey,
  diagnosticsEnabled: true
});

function PrelaunchChecks() {
  const navigator = useNavigation<any>();
  useEffect(() => {
    AsyncStorageUtils.get(PersistableKeys.AccessToken)
    .then(res => {
      if (res) {
        navigator.replace(Screens.Main)
      }
    })
  }, []);
  return <></>
}

export default function App() {
  const theme = useColorScheme();
  const statusTheme = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <StoreProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={Screens.Login} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name={Screens.SignUp} component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name={Screens.Main} component={MainScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
          <BottomSheetDelegate />
          <PrelaunchChecks />
        </NavigationContainer>
      </StoreProvider>
      <Toast />
      <StatusBar barStyle={statusTheme} />
    </>
  );
}
