import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, Dimensions, Text, FlatList } from 'react-native'
import { ContentReaderPage } from './contentReaderPage/contentReaderPage';
import { Txt } from '../core/layout/txt/Txt';
import { useReaderController } from '~/lib/hooks/useReaderController';
import { Word } from '~/api/types/word';
import { Book } from '../core/layout/book/book';
import { countWordsPresent, spansToString } from '~/lib/utils/textUtils';
import { ContentApi } from '~/api/contentApi';
import { Language } from '~/lib/types/enums/Language';
import { useStores } from '~/lib/state/storeProvider';
import { BottomSheetType } from '~/lib/state/stores/bottomSheetStore';

import styles from './contentReader.styles';
import { LinearProgress } from '../core/layout/linearProgress/linearProgress';
import { VerticalSpacer } from '../core/layout/verticalSpacer/verticalSpacer';

const { width, height } = Dimensions.get('window');

/**
 * Before we even render we need to make certain calculations
 * around how many lines and how wide the lines will be so that
 * we can dynamically adapt to book content and always show
 * the right amount of content to the user.
 */
const useableWidth = width - 32;
const useableHeight = height - 260;
const charWidth = 12;
const charHeight = 40;
const charsPerLine = useableWidth / charWidth;
const linesPerPage = (useableHeight / charHeight);

interface Props {
    language: Language;
    spans: string[][];
    dictionary: { [key in string]: Word }
}

/**
 * Accepts content data and displays it to the user.
 * This component is central to displaying a readable book
 * to the user.
 */
export const ContentReader = (props: Props) => {
    const { bottomSheetStore, dictionaryStore } = useStores();
    const { spans, dictionary } = props;
    const [selectedSpan, setSelectedSpan] = useState('');
    const readerController = useReaderController({ spans, charsPerLine, linesPerPage });
    const [pageWordLoading, setPageWordLoading] = useState<number |null>(null);

    useEffect(() => {
        if (selectedSpan) {
            const actualSpan = selectedSpan.split('|')[0];
            const word = dictionary[actualSpan];
            bottomSheetStore.setMessage({
                type: BottomSheetType.WordBottomSheet,
                data: word,
                onClose: () => setSelectedSpan('')
            });
        }
    }, [selectedSpan, spans, dictionary])

    const spanOnSelected = (span: string) => {
        setSelectedSpan(span);
    }

    useEffect(() => {
        (async () => {
            if (readerController.page && !pageWordLoading) {
                const bufferSize = 2;
                const wordsPresentThreshold = 20;
                const firstPage = readerController.page;
                const lastPage = Math.min(
                    readerController.page + bufferSize,
                    readerController.totalPages
                );
                for (let i = firstPage; i < lastPage; i++) {
                    const pg = readerController.pages[i];
                    const wordsPresent = countWordsPresent(pg, dictionary);
                    if (wordsPresent < wordsPresentThreshold) {
                        const stringContent = spansToString(pg);
                        try {
                            setPageWordLoading(i);
                            const newDictionary = await ContentApi.enrich(props.language, stringContent);
                            dictionaryStore.updateDictionary(props.language, newDictionary);
                            setPageWordLoading(null);
                        } catch (e) {
                            setPageWordLoading(null);
                        }
                    }
                }
            }
        })()
    }, [readerController.page, pageWordLoading]);

    return (
        <>
            <LinearProgress progress={readerController.complete} />
            <VerticalSpacer spacing={4} />
            <Txt type='subtitle'>{readerController.page + 1} / {readerController.totalPages}</Txt>
            <View style={styles.viewport}>
                <Book
                    horizontalPadding={32}
                    verticalPadding={200}
                    data={readerController.pages}
                    onPageChange={readerController.setPage}
                    renderItem={({ item, index }) => (
                        <ContentReaderPage
                            isLoading={index === pageWordLoading}
                            spans={item}
                            dictionary={dictionary}
                            selectedSpan={selectedSpan}
                            setSelectedSpan={spanOnSelected}
                        />
                    )}
                />
            </View>
        </>
        
    )
}
