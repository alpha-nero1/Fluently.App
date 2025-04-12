import React, { useEffect, useRef, useState } from 'react'
import { View, Dimensions } from 'react-native'
import { ContentReaderPage } from './contentReaderPage/contentReaderPage';
import { Txt } from '~/components/core/layout/txt/Txt';
import { useReaderController } from '~/lib/hooks/useReaderController';
import { Book } from '~/components/core/layout/book/book';
import { countWordsPresent, spansToString } from '~/lib/utils/textUtils';
import { useContentApi } from '~/api/contentApi';
import { Language } from '~/lib/types/enums/Language';
import { useStores } from '~/lib/state/storeProvider';
import { BottomSheetType } from '~/lib/state/stores/bottomSheetStore';
import { LinearProgress } from '~/components/core/layout/linearProgress/linearProgress';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { IconButton } from '~/components/core/inputs/iconButton/iconButton';
import { Flex } from '~/components/core/layout/flex/flex';
import { ContentSection } from '~/api/types/contentSection';

import styles from './contentReader.styles';

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

const enrichmentBufferSize = 2;

interface Props {
    contentId: string;
    progress: number;
    language: Language;
    sections: ContentSection[];
    sectionMap: any;
    spans: string[][];
}

/**
 * Accepts content data and displays it to the user.
 * This component is central to displaying a readable book
 * to the user.
 */
export const ContentReader = (props: Props) => {
    const { bottomSheetStore, dictionaryStore, settingStore } = useStores();
    const { spans, contentId, sections, sectionMap } = props;
    const [selectedSpan, setSelectedSpan] = useState('');
    const readerController = useReaderController({ spans, charsPerLine, linesPerPage, sectionMap });
    const pagesFetched = useRef<Set<number>>(new Set<number>());
    const [pagesFetching, setPagesFetching] = useState<Set<number>>(new Set<number>());
    const dictionary = dictionaryStore.getDictionary(props.language) ?? {};
    const contentApi = useContentApi(settingStore.accessToken);

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
    }, [selectedSpan, spans, dictionary]);

    useEffect(() => {
        contentApi.progress(
            contentId, 
            readerController.cursor,
            readerController.totalSpans
        );
    }, [readerController.cursor]);

    const spanOnSelected = (span: string) => {
        setSelectedSpan(span);
    }

    useEffect(() => {
        const enrichWords = async () => {
            if (readerController.pages) {
                // We are fetching too many already, employ the stop-gap.
                if (pagesFetching.size === enrichmentBufferSize) {
                    return;
                }
                const wordsPresentThreshold = 20;
                const firstPage = readerController.page;
                const lastPage = Math.min(
                    readerController.page + enrichmentBufferSize,
                    readerController.totalPages
                );

                for (let i = firstPage; i < lastPage; i++) {
                    if (pagesFetched.current.has(i) || pagesFetching.has(i)) {
                        continue;
                    }

                    const pg = readerController.pages[i];
                    const wordsPresent = countWordsPresent(pg, dictionary);
                    if (wordsPresent < wordsPresentThreshold) {
                        const stringContent = spansToString(pg);
                        try {
                            addToFetching(i);
                            const newDictionary = await contentApi.enrich(props.language, settingStore.learnerLanguage, stringContent);
                            dictionaryStore.updateDictionary(props.language, newDictionary);
                        } catch (e) {
                            console.error('Enrichment failed!', e)
                        } finally {
                            pagesFetched.current.add(i);
                            removeFromFetching(i);
                        }
                    }
                }
            }
        };

        enrichWords();
    }, [readerController.pages, readerController.page]);

    const addToFetching = (ind: number) => {
        const newSet = new Set(pagesFetching);
        newSet.add(ind);
        setPagesFetching(newSet);
    }

    const removeFromFetching = (ind: number) => {
        const newSet = new Set(pagesFetching);
        newSet.delete(ind);
        setPagesFetching(newSet);
    }

    const menuOnPress = () => {
        bottomSheetStore.setMessage({
            type: BottomSheetType.Menu,
            data: sections,
            onClose: (section: ContentSection) => {
                if (section) {
                    // GO TO SECTION SOMEHOW!
                    readerController.setSection(section.contentSectionId);
                }
            }
        });
    }

    return (
        <>
            <LinearProgress progress={readerController.complete} />
            <VerticalSpacer spacing={4} />
            <Flex justifySpaceBetween alignCenter style={{ width: '100%', paddingLeft: 8, paddingRight: 8 }}>
                <IconButton icon='menu' onPress={menuOnPress} size='medium' />
                <Txt type='subtitle'>{readerController.page + 1} / {readerController.totalPages}</Txt>
                <View style={{ width: 40 }}/>
            </Flex>
            <View style={styles.viewport}>
                <Book
                    horizontalPadding={32}
                    verticalPadding={200}
                    data={readerController.pages}
                    page={readerController.page}
                    onPageChange={readerController.setPage}
                    renderItem={({ item, index }) => (
                        <ContentReaderPage
                            isLoading={pagesFetching.has(index)}
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
