import React, { useState } from 'react'
import { View } from 'react-native'
import { BasicContent } from '~/api/types/basicContent'
import { useApiContext } from '~/lib/hooks/useApiContext';
import { ContentApi } from '~/api/contentApi';
import { ContentReader } from '~/components/contentReader/contentReader';
import { Loader } from '~/components/core/layout/loader/loader';

import styles from './content.styles';

export default function ContentScreen({ route }: any) {
    const basicContent = route.params.content as BasicContent;
    const [spans, setSpans] = useState<string[][]>([]);

    const content = useApiContext({
        id: `library_content_${basicContent.contentId}`,
        fetcher: () => ContentApi.get(basicContent.contentId, 0, 100),
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

            setSpans(allSpans);
        }
    });

    return (
        <View style={styles.page}>
            {
                content.isLoading 
                ? <Loader />
                : null
            }
            {
                spans.length 
                && content.data
                ? <ContentReader 
                    language={basicContent.language}
                    spans={spans} 
                    dictionary={content.data.words} 
                    linesPerPage={8} 
                />
                : null
            }
        </View>
    )
}
