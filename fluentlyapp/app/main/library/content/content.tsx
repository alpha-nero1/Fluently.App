import React, { useState } from 'react'
import { useApiContext } from '~/lib/hooks/useApiContext';
import { useContentApi } from '~/api/contentApi';
import { ContentReader } from '~/components/features/contentReader/contentReader';
import { Loader } from '~/components/core/layout/loader/loader';
import { useStores } from '~/lib/state/storeProvider';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { Flex } from '~/components/core/layout/flex/flex';
import { useRoute } from '@react-navigation/native';

export default () => {
    const route = useRoute();
    const contentId = (route.params as any).contentId as string;
    const [spans, setSpans] = useState<string[][]>([]);
    const { dictionaryStore, settingStore } = useStores();
    const contentApi = useContentApi(settingStore.accessToken);
    const [sectionMap, setSectionMap] = useState<any>({});

    const content = useApiContext({
        id: `content_${contentId}`,
        fetcher: () => contentApi.get(contentId, settingStore.learnerLanguage, 0, 100),
        dataInterceptor: (content) => {
            const allSpans: string[][] = [];
            const _sectionMap: any = {};
            (content?.data || []).forEach(({ data: contentData, contentSectionId }) => {
                _sectionMap[contentSectionId] = allSpans.length;
                // Get the lines of the content data string[]
                const lines = contentData.split(/\r?\n/);
                // For each line of content, process it.
                lines.forEach((line: string) => {
                    if (line.trim() === '') {
                        allSpans.push([]);
                        return;
                    }
                    allSpans.push(line.split(' '))
                });


            });

            dictionaryStore.updateDictionary(content.language, content.words);
            setSpans(allSpans);
            // The section map maps to section id to the span index.
            setSectionMap(_sectionMap);
        }
    });

    return (
        <PageView disableDefaultPadding>
            <Flex column justifyCenter alignCenter flex={1}>
                {
                    content.isLoading 
                    ? <Loader size={'large'}/>
                    : null
                }
                {
                    spans.length 
                    && content.data
                    ? <ContentReader 
                        contentId={contentId}
                        progress={content.data.progress}
                        language={content.data.language}
                        spans={spans} 
                        sections={content.data.sections}
                        sectionMap={sectionMap}
                    />
                    : null
                }
            </Flex>
        </PageView>
    )
}
