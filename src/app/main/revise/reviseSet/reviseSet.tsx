import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { SetApi } from '~/api/setApi';
import { SetCardReviewResult } from '~/api/types/setCardReviewResult';
import { Flex } from '~/components/core/layout/flex/flex';
import { LinearProgress } from '~/components/core/layout/linearProgress/linearProgress';
import { Loader } from '~/components/core/layout/loader/loader';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { Txt } from '~/components/core/layout/txt/Txt';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { StudyCard } from '~/components/revision/studyCard/studyCard';
import { useApiContext } from '~/lib/hooks/useApiContext';
import { useStores } from '~/lib/state/storeProvider';
import { SetCardGrade } from '~/lib/types/enums/SetCardGrade';

const { width, height } = Dimensions.get('screen');

export default () => {
    const router = useRouter();
    const { settingStore, setStore } = useStores();
    const set = setStore.getLanguageSet(settingStore.learningLanguage);
    const [reviewIndex, setReviewIndex] = useState(0);
    const results = useRef<SetCardReviewResult[]>([]);
    const cardTimeStart = useRef<number>(0);
    
    const revisionContext = useApiContext({
        id: `revision_${set?.setId || 0}`,
        fetcher: () => SetApi.startReview(set?.setId || 0)
    });

    const cards = revisionContext.data;
    const cardsLength = cards?.length || 0;

    const currentCard = (() => {
        if (!cards?.length) return null;
        return cards[reviewIndex];
    })();

    useEffect(() => {
        if (revisionContext.isLoading || revisionContext.isError) {
            return () => {};
        }
        cardTimeStart.current = new Date().getTime();
    }, [reviewIndex, revisionContext.isLoading]);

    const goBack = () => router.back();

    const feedbackOnClick = (grade: SetCardGrade) => {
        const reviewMs = new Date().getTime() - cardTimeStart.current;
        results.current.push(new SetCardReviewResult({
            setCardId: currentCard?.setCardId,
            grade,
            reviewMs
        }));
        if (reviewIndex === cardsLength - 1) {
            // End review and return to set page.
            return SetApi.endReview(set?.setId || 0, results.current)
                .then(goBack);
        }
        setReviewIndex(reviewIndex + 1);
    }

    if (revisionContext.isLoading) {
        return (
            <PageView>
                <Loader />
            </PageView>
        );
    }

    return (
        <PageView>
            <Flex column alignCenter>
                <LinearProgress progress={((reviewIndex + 1) / cardsLength)} />
                <VerticalSpacer spacing={16} />
                {currentCard && (
                    <StudyCard
                        width={width - 32}
                        height={height - 100}
                        setCard={currentCard}
                        feedbackOnClick={feedbackOnClick}
                    />
                )}
            </Flex>
        </PageView>
    );
}
