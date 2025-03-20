import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '~/lib/state/storeProvider';
import { getColours } from '~/lib/themes/colours';
import { useColours } from '~/lib/hooks/useColours';
import { ReviseScreen } from './revise/revise';
import { AccountScreen } from './account/account';
import { LibraryScreen } from './library/library';
import { ExploreScreen } from './explore/explore';
import { useAppStartup } from '~/lib/hooks/useAppStartup';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    const colours = useColours();
    const navigation = useNavigation();
    useAppStartup();

    useEffect(() => {
        // Hide the header for all screens in the tab navigator
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const style = {
        backgroundColor: colours.Background
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: getColours().Blue,
                tabBarStyle: style, // Apply background color style to the tab bar
            }}
        >
            <Tab.Screen 
                name="Explore" 
                component={ExploreScreen} // Replace with your actual component
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Library" 
                component={LibraryScreen} // Replace with your actual component
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Revise" 
                component={ReviseScreen} // Replace with your actual component
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="auto-stories" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Account" 
                component={AccountScreen} // Replace with your actual component
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}