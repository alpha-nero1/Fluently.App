import React, { useMemo } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { ContentApi } from '~/api/contentApi'
import { BasicContent } from '~/api/types/basicContent'
import { ExploreList, IExploreListCategory } from '~/components/core/layout/exploreList/exploreList'
import { PageView } from '~/components/core/layout/pageView/pageView'
import { Txt } from '~/components/core/layout/txt/Txt'
import { useApiContext } from '~/lib/hooks/useApiContext'
import { useI18 } from '~/lib/hooks/useI18'
import { useStores } from '~/lib/state/storeProvider'

const dummyCat = (name: string, data: any) => {
    const cat: IExploreListCategory<BasicContent> = {
        name: name,
        content: data || []
    }
    return cat;
}

export default () => {
    const { settingStore } = useStores();
    const i18 = useI18();

    const content = useApiContext({
        id: `library_content-${settingStore.learningLanguage}`,
        fetcher: () => ContentApi.list(settingStore.learningLanguage)
    });

    const categories = useMemo(() => {
        if (!content.data?.data) return [];
        const contents = content.data?.data || [];
        
        return [
            dummyCat('Drama', contents), 
            dummyCat('Thrillers', contents), 
            dummyCat('Non-fiction', contents), 
            dummyCat('Adventure', contents), 
            dummyCat('History', contents)
        ];
    }, [content.data])

    return (
        <PageView disableDefaultPadding>
            <Txt type='h1' style={{ paddingLeft: 16 }}>{i18.Explore}</Txt>
            <ExploreList<BasicContent>
                categories={categories}
                renderKey='contentId'
                render={content => (
                    <TouchableWithoutFeedback>
                        <View style={{ padding: 16 }}>
                            <View style={{ height: 120, width: 100, backgroundColor: 'grey', borderRadius: 8 }}/>
                            <Txt type='normal'>{content.title}</Txt>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        </PageView>
    )
}
