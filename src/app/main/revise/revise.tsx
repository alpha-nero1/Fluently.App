import React, { useState, useEffect } from 'react'
import { CircularProgress } from '~/components/core/layout/circularProgress/circularProgress'
import { PageView } from '~/components/core/layout/pageView/pageView'
import { Txt } from '~/components/core/layout/txt/Txt'
import { FlatList, RefreshControl, TouchableWithoutFeedback, View } from 'react-native';
import { SetCardGrade } from '~/lib/types/enums/SetCardGrade';
import { deepCopyArray } from '~/lib/utils/arrayUtils';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { Lozenge, LozengeStatus } from '~/components/core/layout/lozenge/lozenge';
import { useApiContext } from '~/lib/hooks/useApiContext';
import { SetApi } from '~/api/setApi';
import { useStores } from '~/lib/state/storeProvider';
import { Button } from '~/components/core/inputs/button/button';
import { useRouter } from 'expo-router';
import { SetCard } from '~/api/types/setCard';
import { BottomSheetType } from '~/lib/state/stores/bottomSheetStore';
import { useColouredStyles, useColours } from '~/lib/hooks/useColours';
import { useI18 } from '~/lib/hooks/useI18';

import { styleFunc } from './revise.styles';

const gradeToStatusMapping: { [key in SetCardGrade]: LozengeStatus } = {
    [SetCardGrade.A]: 'success',
    [SetCardGrade.B]: 'info',
    [SetCardGrade.C]: 'warning',
    [SetCardGrade.D]: 'error',
    [SetCardGrade.E]: 'special',
    [SetCardGrade.F]: 'special',
    [SetCardGrade.New]: 'unknown',
    [SetCardGrade.Unknown]: 'unknown',
}

const gradeToIndexMapping: { [key in SetCardGrade]: number } = {
    [SetCardGrade.A]: 6,
    [SetCardGrade.B]: 5,
    [SetCardGrade.C]: 4,
    [SetCardGrade.D]: 3,
    [SetCardGrade.E]: 2,
    [SetCardGrade.F]: 1,
    [SetCardGrade.New]: 0,
    [SetCardGrade.Unknown]: -1,
}

const displayGradeMapping: { [key in SetCardGrade]: string } = {
    [SetCardGrade.A]: 'A',
    [SetCardGrade.B]: 'B',
    [SetCardGrade.C]: 'C',
    [SetCardGrade.D]: 'D',
    [SetCardGrade.E]: 'E',
    [SetCardGrade.F]: 'F',
    [SetCardGrade.New]: 'New',
    [SetCardGrade.Unknown]: 'No idea',
}

const getDefaultGroupings = (): [number, SetCardGrade][] => deepCopyArray([
    [0, SetCardGrade.New], 
    [0, SetCardGrade.F], 
    [0, SetCardGrade.E], 
    [0, SetCardGrade.D], 
    [0, SetCardGrade.C], 
    [0, SetCardGrade.B], 
    [0, SetCardGrade.A]
]);

export default () => {
    const router = useRouter()
    const { settingStore, setStore, bottomSheetStore } = useStores();
    const [cardGradeGroupings, setCardGradeGroupings] = useState<[number, SetCardGrade][]>(getDefaultGroupings());
    const styles = useColouredStyles(styleFunc);
    const colours = useColours();
    const i18 = useI18();

    const set = setStore.getLanguageSet(settingStore.learningLanguage);

    const setContext = useApiContext({
        id: `sets_${set?.setId}-${setStore.cards.size}`,
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

    const reviseOnPress = () => {
        router.push('/main/revise/reviseSet/reviseSet')
    }

    const openCardDetails = (card: SetCard) => {
        bottomSheetStore.setMessage({
            type: BottomSheetType.WordBottomSheet,
            data: card,
            onClose: () => {}
        })
    }

    return (
        <PageView>
            <View style={styles.header}>
                <Txt type='h1'>{i18.Revise}</Txt>
                <CircularProgress progress={totalGrade} status={getLozengeStatus()}/>
            </View>
            <View style={styles.setOverview}>
                {cardGradeGroupings.map((pair: [number, SetCardGrade]) => (
                    <View key={pair[1]} style={styles.gradeOverview}>
                        <Txt type='title'>{pair[0]}</Txt>
                        <VerticalSpacer spacing={4} />
                        <Lozenge status={gradeToStatusMapping[pair[1]]}>{displayGradeMapping[pair[1]]}</Lozenge>
                    </View>
                ))}
            </View>
            <VerticalSpacer spacing={32} />
            <View>
                <Txt type='title'>{i18.Cards} {cards.length}/{cards.length}</Txt>
                <VerticalSpacer spacing={16} />
                <FlatList
                    data={cards}
                    keyExtractor={(item, index) => '' + item.setCardId}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={<View style={{ height: 200 }} />}
                    renderItem={({ item: card }) => (
                        <TouchableWithoutFeedback onPress={() => openCardDetails(card)}>
                            <View style={styles.setCardOutline} key={card.name}>
                                <View style={styles.setCardOutlineLeft}>
                                    <Txt bold>{card.name}</Txt>
                                    <Txt>{card.meaning}</Txt>
                                </View>
                                <View>
                                    <Lozenge className={styles.setCardOutlineRight} status={gradeToStatusMapping[card.currentGrade]}>{'' + card.currentGrade}</Lozenge>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    windowSize={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={setContext.isLoading} // Indicates if the list is refreshing
                            onRefresh={setContext.refresh} // Function to call on pull-to-refresh
                            colors={[colours.Blue]} // Android refresh spinner color
                            tintColor={colours.Blue} // iOS refresh spinner color
                            title={`${i18.Loading}...`} // iOS refresh spinner title
                            titleColor={colours.Blue} // iOS spinner title color
                        />
                    }
                />
            </View>
            <View style={styles.footerButton}>
                <Button height={50} onPress={reviseOnPress}>{i18.Revise}</Button>
            </View>
        </PageView>
    )
}
