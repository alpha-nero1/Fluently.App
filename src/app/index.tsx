import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "./auth/login/loginScreen";
import { MainApp } from "./main";
import {
	configureReanimatedLogger,
	ReanimatedLogLevel,
  } from 'react-native-reanimated';
import { StoreProvider } from '~/lib/state/storeProvider';
  
// This is the default configuration
configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false
});

// Stack Navigator for Login Flow
const Stack = createStackNavigator();

export default function App() {
	return (
		<StoreProvider>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
				<Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
			</Stack.Navigator>
		</StoreProvider>
	);
}
