import React from 'react'
import { FlatList, RefreshControl, Pressable, View } from 'react-native'
import { useContentApi } from '~/api/contentApi';
import { useApiContext } from '~/lib/hooks/useApiContext'
import { Txt } from '~/components/core/layout/txt/Txt';
import { useStores } from '~/lib/state/storeProvider';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { Flex } from '~/components/core/layout/flex/flex';
import { useI18 } from '~/lib/hooks/useI18';
import { useColours } from '~/lib/hooks/useColours';
import { useColouredStyles } from '~/lib/hooks/useColouredStyles';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Screens } from '~/lib/types/enums/Screens';
import Content from './content/content';
import { useNavigation } from '@react-navigation/native';
import { StaticImage } from '~/components/core/layout/staticImage/staticImage';
import { LibraryContent } from '~/api/types/libraryContent';
import { Lozenge } from '~/components/core/layout/lozenge/lozenge';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';

import { stylesFunc } from './library.styles';

type StackParamList = {
    Library: undefined;
    LibraryContent: { contentId: string };
};
  
const Stack = createStackNavigator<StackParamList>();

const LibraryContentItem = ({ item: content }: { item: LibraryContent }) => {
    const styles = useColouredStyles(stylesFunc);
    const i18 = useI18();
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const onPress = () => {
        navigation.navigate(Screens.LibraryContent, {
            contentId: content.contentId
        });
    }
    
    return (
        <Pressable style={styles.item} onPress={onPress}>
            <Flex flex={1} column alignStart justifyEnd>
                <StaticImage  height={200} width={140} objectKey={content.coverImageUrl} />
                <VerticalSpacer spacing={8} />
                <Txt type='emphasised'>{content.title}</Txt>
                <Txt type='subtitle'>{content.author}</Txt>
                {
                    content.progress === 0
                    ? <Lozenge status='unknown'>New</Lozenge>
                    : <Lozenge status='info'>{'' + Math.ceil(content.progress * 100) + '%'}</Lozenge>
                }
            </Flex>
        </Pressable>
    );
}

function Library() {
    const { settingStore } = useStores();
    const colours = useColours();
    const styles = useColouredStyles(stylesFunc)
    const i18 = useI18();
    const contentApi = useContentApi(settingStore.accessToken);
    
    const content = useApiContext({
        id: `library_content-${settingStore.learningLanguage}`,
        refreshable: true,
        fetcher: () => contentApi.listLibrary(settingStore.learningLanguage)
    });

    return (
        <PageView disableDefaultPadding>
            <View style={styles.header}>
                <Txt type='h1'>{i18.Library}</Txt>
            </View>
            <FlatList
                style={{ paddingTop: 12 }}
                numColumns={2}
                data={content.data?.data} 
                keyExtractor={(item) => item.contentId} 
                renderItem={(props) => <LibraryContentItem {...props} />}
                refreshControl={
                    <RefreshControl
                        refreshing={content.isLoading} 
                        onRefresh={content.refresh} 
                        colors={[colours.Blue]} 
                        tintColor={colours.Blue} 
                        title={`${i18.Loading}...`}
                        titleColor={colours.Blue}
                    />
                }
            />
        </PageView>
    )
}

export const LibraryScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name={Screens.Library}
                component={Library}
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name={Screens.LibraryContent}
                component={Content}
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}

