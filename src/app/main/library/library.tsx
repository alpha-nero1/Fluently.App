import React from 'react'
import { FlatList, RefreshControl, Pressable, View } from 'react-native'
import { ContentApi } from '~/api/contentApi';
import { BasicContent } from '~/api/types/basicContent';
import { useApiContext } from '~/lib/hooks/useApiContext'
import { Txt } from '~/components/core/layout/txt/Txt';
import { useStores } from '~/lib/state/storeProvider';
import { useRouter } from 'expo-router';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { Flex } from '~/components/core/layout/flex/flex';
import { useColouredStyles, useColours } from '~/lib/hooks/useColours';
import { useI18 } from '~/lib/hooks/useI18';

import { stylesFunc } from './library.styles';

function LibraryContent({ item: content }: { item: BasicContent }) {
    const router = useRouter();
    const styles = useColouredStyles(stylesFunc)
    const colours = useColours();

    const onPress = () => {
        router.push({
            pathname: '/main/library/content/content',
            params: { contentId: content.contentId }
        });
    }
    
    return (
        <Pressable style={styles.item} onPress={onPress}>
            <Flex flex={1} column alignStart justifyEnd>
                <View style={{ backgroundColor: colours.PurpleLight, width: 160, height: 200, borderRadius: 8, margin: 4 }}></View>
                <Txt type='emphasised'>{content.title}</Txt>
                <Txt type='subtitle'>{content.author}</Txt>
            </Flex>
        </Pressable>
    );
}

export default function Library() {
    const { settingStore } = useStores();
    const colours = useColours();
    const styles = useColouredStyles(stylesFunc)
    const i18 = useI18();

    const content = useApiContext({
        id: `library_content-${settingStore.learningLanguage}`,
        fetcher: () => ContentApi.list(settingStore.learningLanguage)
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
                renderItem={(props) => <LibraryContent {...props} />}
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

