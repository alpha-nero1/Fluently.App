import React, { useState } from 'react'
import { useApiContext } from '~/lib/hooks/useApiContext';
import { ContentApi } from '~/api/contentApi';
import { ContentReader } from '~/components/contentReader/contentReader';
import { Loader } from '~/components/core/layout/loader/loader';
import { useStores } from '~/lib/state/storeProvider';
import { useLocalSearchParams } from 'expo-router';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { Flex } from '~/components/core/layout/flex/flex';

export default () => {
    const params = useLocalSearchParams();
    const contentId = params.contentId as string;
    const [spans, setSpans] = useState<string[][]>([]);
    const { dictionaryStore } = useStores();

    const content = useApiContext({
        id: `content_${contentId}`,
        fetcher: () => ContentApi.get(contentId, 0, 100),
        dataInterceptor: (content) => {
            const allSpans: string[][] = [];
            (content?.data || []).forEach(({ data: contentData }) => {
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
        }
    });

    return (
        <PageView disableDefaultPadding>
            <Flex column justifyCenter alignCenter>
                {
                    content.isLoading 
                    ? <Loader />
                    : null
                }
                {
                    spans.length 
                    && content.data
                    ? <ContentReader 
                        language={content.data.language}
                        spans={spans} 
                    />
                    : null
                }
            </Flex>
        </PageView>
    )
}
