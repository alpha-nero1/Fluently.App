import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { useContentApi } from '~/api/contentApi'
import { BasicContent } from '~/api/types/basicContent'
import { ExploreList, IExploreListCategory } from '~/components/core/layout/exploreList/exploreList'
import { PageView } from '~/components/core/layout/pageView/pageView'
import { StaticImage } from '~/components/core/layout/staticImage/staticImage'
import { Txt } from '~/components/core/layout/txt/Txt'
import { useApiContext } from '~/lib/hooks/useApiContext'
import { useI18 } from '~/lib/hooks/useI18'
import { useStores } from '~/lib/state/storeProvider'
import { BottomSheetType } from '~/lib/state/stores/bottomSheetStore'
import { Screens } from '~/lib/types/enums/Screens'

export const ExploreScreen = () => {
    const { settingStore, bottomSheetStore } = useStores();
    const i18 = useI18();
    const contentApi = useContentApi(settingStore.accessToken);
    const navigation = useNavigation<any>();

    const content = useApiContext({
        id: `explore_content-${settingStore.learningLanguage}`,
        refreshable: true,
        fetcher: () => contentApi.list(settingStore.learningLanguage)
    });

    const contentGroupedByCateories = useMemo(() => {
        const map: { [key in string]: IExploreListCategory<BasicContent> } = {};
        content.data?.data.forEach(content => {
            if (!map[content.category.name]) {
                map[content.category.name] = {
                    name: content.category.name,
                    content: []
                }
            }
            map[content.category.name].content.push(content);
        });
        return Object.values(map);
    }, [content.data]);

    const contentOnPress = (content: BasicContent) => {
        bottomSheetStore.setMessage({
            type: BottomSheetType.ReadNow,
            data: content,
            onClose: (content) => {
                if (!content) return;
                navigation.navigate(Screens.Library, {
                    screen: Screens.LibraryContent,
                    params: { contentId: content.contentId }
                });
            }
        })
    }

    return (
        <PageView disableDefaultPadding>
            <Txt type='h1' style={{ paddingLeft: 16 }}>{i18.Explore}</Txt>
            <ExploreList<BasicContent>
                categories={contentGroupedByCateories}
                renderKey='contentId'
                render={content => (
                    <TouchableWithoutFeedback onPress={() => contentOnPress(content)}>
                        <View style={{ padding: 16 }}>
                            <StaticImage height={200} width={140} objectKey={content.coverImageUrl} />
                            <Txt type='normal'>{content.title}</Txt>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        </PageView>
    )
}
