import React, { useState, useEffect } from 'react'
import { CircularProgress } from '~/components/core/layout/circularProgress/circularProgress'
import { PageView } from '~/components/core/layout/pageView/pageView'
import { Txt } from '~/components/core/layout/txt/Txt'
import { View } from 'react-native';
import { SetCardGrade } from '~/lib/types/enums/SetCardGrade';
import { deepCopyArray } from '~/lib/utils/arrayUtils';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { Lozenge, LozengeStatus } from '~/components/core/layout/lozenge/lozenge';
import { useApiContext } from '~/lib/hooks/useApiContext';
import { SetApi } from '~/api/setApi';
import { useStores } from '~/lib/state/storeProvider';
import { Button } from '~/components/core/inputs/button/button';
import { ScrollView } from 'react-native-gesture-handler';

import styles from './revise.styles';

const gradeToVariantMapping: { [key in SetCardGrade]: LozengeStatus } = {
    [SetCardGrade.A]: 'success',
    [SetCardGrade.B]: 'info',
    [SetCardGrade.C]: 'warning',
    [SetCardGrade.D]: 'error',
    [SetCardGrade.E]: 'unknown',
    [SetCardGrade.F]: 'unknown',
    [SetCardGrade.Unknown]: 'unknown',
}

const gradeToIndexMapping: { [key in SetCardGrade]: number } = {
    [SetCardGrade.A]: 5,
    [SetCardGrade.B]: 4,
    [SetCardGrade.C]: 3,
    [SetCardGrade.D]: 2,
    [SetCardGrade.E]: 1,
    [SetCardGrade.F]: 0,
    [SetCardGrade.Unknown]: -1,
}

const getDefaultGroupings = (): [number, SetCardGrade][] => deepCopyArray([
    [0, SetCardGrade.F], 
    [0, SetCardGrade.E], 
    [0, SetCardGrade.D], 
    [0, SetCardGrade.C], 
    [0, SetCardGrade.B], 
    [0, SetCardGrade.A]
]);

export const Revise = () => {
    const { settingStore, setStore } = useStores();
    const [cardGradeGroupings, setCardGradeGroupings] = useState<[number, SetCardGrade][]>(getDefaultGroupings());
    
    const set = setStore.getLanguageSet(settingStore.learningLanguage);

    const setContext = useApiContext({
        id: `sets_${set?.setId}`,
        fetcher: () => SetApi.get(set?.setId ?? 0, true)
    });

    useEffect(() => {
        if (!cards.length) return () => {};
        const groupings = getDefaultGroupings()
        cards.forEach(card => {
            const gradeIndex = gradeToIndexMapping[card.currentGrade];
            groupings[gradeIndex][0] += 1;
        });

        setCardGradeGroupings(groupings);
    }, [setContext.data]);

    const cards = setContext.data?.cards ?? [];
    const cardsAced = cards.filter(c => c.currentGrade === SetCardGrade.A);
    const totalGrade = cards?.length 
        ? cardsAced.length / cards.length * 100
        : 0;

    const getLozengeStatus = () => {
        if (totalGrade > 90) return 'success';
        return 'info'
    }

    return (
        <PageView>
            <View style={styles.header}>
                <Txt type='h1'>Revise</Txt>
                <CircularProgress progress={totalGrade} status={getLozengeStatus()}/>
            </View>
            <View style={styles.setOverview}>
                {cardGradeGroupings.map((pair: [number, SetCardGrade]) => (
                    <View key={pair[1]} style={styles.gradeOverview}>
                        <Txt type='title'>{pair[0]}</Txt>
                        <VerticalSpacer spacing={4} />
                        <Lozenge status={gradeToVariantMapping[pair[1]]}>{'' + pair[1]}</Lozenge>
                    </View>
                ))}
            </View>
            <VerticalSpacer spacing={32} />
            <View>
                <Txt type='title'>Cards {cards.length}/{cards.length}</Txt>
                <VerticalSpacer spacing={16} />
                <ScrollView>
                    <View style={styles.setCards}>
                        {cards.map(card => (
                            <View style={styles.setCardOutline} key={card.setCardId}>
                                <View style={styles.setCardOutlineLeft}>
                                    <Txt bold>{card.name}</Txt>
                                    <Txt>{card.meaning}</Txt>
                                </View>
                                <Lozenge className={styles.setCardOutlineRight} status={gradeToVariantMapping[card.currentGrade]}>{'' + card.currentGrade}</Lozenge>
                            </View>
                        ))}
                    </View>
                    <VerticalSpacer spacing={300} />
                </ScrollView>
            </View>
            <View style={styles.footerButton}>
                <Button height={50}>Revise</Button>
            </View>
        </PageView>
    )
}
