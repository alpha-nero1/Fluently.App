import { useEffect } from 'react';
import { Tabs, useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStores } from '~/lib/state/storeProvider';
import { getColours } from '~/lib/themes/colours';
import { useColours } from '~/lib/hooks/useColours';

export default function MainTabs() {
    const { setStore, settingStore } = useStores();
    const colours = useColours();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    useEffect(() => {
        setStore.initialise(settingStore.learningLanguage);
    }, []);

    const style = {
        backgroundColor: colours.Background
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: getColours().Blue,
            }}
        >
            <Tabs.Screen 
                name="explore"
                title='Explore'
                options={{
                    headerShown: false,
                    tabBarStyle: style,
                    tabBarIcon: ({ color, size }: any) => (
                        <Icon name="search" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name="library"
                title='Library'
                options={{
                    headerShown: false,
                    tabBarStyle: style,
                    tabBarIcon: ({ color, size }: any) => (
                        <Icon name="book" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name="revise"
                title='Revise'
                options={{
                    headerShown: false,
                    tabBarStyle: style,
                    tabBarIcon: ({ color, size }: any) => (
                        <Icon name="auto-stories" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name="account"
                title='Account'
                options={{
                    headerShown: false,
                    tabBarStyle: style,
                    tabBarIcon: ({ color, size }: any) => (
                        <Icon name="account-circle" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}