import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Choose any icon set
import { LibraryScreen } from "./library/library";
import { BottomSheetDelegate } from "~/components/core/layout/bottomSheetModal/bottomSheetDelegate/bottomSheetDelegate";
import { Account } from "./account/account";
import { Revise } from "./revise/revise";
import { Explore } from "./explore/explore";

const Tab = createBottomTabNavigator();

export function MainApp() {
    return (
        <>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Explore" 
                    component={Explore}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="search" size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen 
                    name="Library" 
                    component={LibraryScreen} 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="book" size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen 
                    name="Revise" 
                    component={Revise} 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="auto-stories" size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen 
                    name="Account" 
                    component={Account} 
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="account-circle" size={size} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
            <BottomSheetDelegate />
        </>
    );
}

