import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Text, FlatList, RefreshControl, Pressable } from 'react-native'
import { ContentApi } from '~/api/contentApi';
import { BasicContent } from '~/api/types/basicContent';
import { useApiContext } from '~/lib/hooks/useApiContext'
import { Language } from '~/lib/types/enums/Language';
import ContentScreen from './content/content';

import styles from './library.styles';
import { Txt } from '~/components/core/layout/txt/Txt';

function LibraryContent({ item, navigation }: { item: BasicContent, navigation: any }) {
    const onPress = () => {
        navigation.push('Content', { content: item })
    }
    
    return (
        <Pressable style={styles.item} onPress={onPress}>
            <Txt type='title'>{item.title}</Txt>
            <Txt type='emphasised'>{item.author}</Txt>
        </Pressable>
    );
}

function Library({ navigation }: any) {
    const content = useApiContext({
        id: 'library_content',
        fetcher: () => ContentApi.list(Language.Italian)
    });

    return (
        <FlatList
            data={content.data?.data} // Data source
            keyExtractor={(item) => item.contentId} // Unique key for each item
            renderItem={(props) => <LibraryContent {...props} navigation={navigation}/>} // Function to render each item
            refreshControl={
                <RefreshControl
                  refreshing={content.isLoading} // Indicates if the list is refreshing
                  onRefresh={content.refresh} // Function to call on pull-to-refresh
                  colors={['#ff6347']} // Android refresh spinner color
                  tintColor="#ff6347" // iOS refresh spinner color
                  title="Loading..." // iOS refresh spinner title
                  titleColor="#ff6347" // iOS spinner title color
                />
              }
        />
    )
}

const Stack = createStackNavigator();

export function LibraryScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Library" component={Library} options={{ headerShown: false }} />
            <Stack.Screen name="Content" component={ContentScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
