import React, { useMemo, useCallback } from 'react'
import { CircularProgress } from '~/components/core/layout/circularProgress/circularProgress'
import { PageView } from '~/components/core/layout/pageView/pageView'
import { Txt } from '~/components/core/layout/txt/Txt'
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';
import { SetCardGrade } from '~/lib/types/enums/SetCardGrade';
import { deepCopyArray } from '~/lib/utils/arrayUtils';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { Lozenge, LozengeStatus } from '~/components/core/layout/lozenge/lozenge';
import { useStores } from '~/lib/state/storeProvider';
import { Button } from '~/components/core/inputs/button/button';
import { SetCard } from '~/api/types/setCard';
import { BottomSheetType } from '~/lib/state/stores/bottomSheetStore';
import { useColouredStyles } from '~/lib/hooks/useColours';
import { useI18 } from '~/lib/hooks/useI18';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { ReviseSet } from './reviseSet/reviseSet';
import { Screens } from '~/lib/types/enums/Screens';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from '~/components/core/inputs/iconButton/iconButton';
import { Flex } from '~/components/core/layout/flex/flex';
import { getName } from '~/lib/utils/wordUtils';

import { styleFunc } from './revise.styles';

const Stack = createStackNavigator();

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

type StackParamList = {
    Revise: undefined;
    ReviseSet: undefined;
};

const Revise = () => {
    const { settingStore, setStore, bottomSheetStore } = useStores();
    const styles = useColouredStyles(styleFunc);
    const i18 = useI18();
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    useFocusEffect(
        useCallback(() => {
            setStore.initialise(
                settingStore.learningLanguage, 
                settingStore.accessToken
            );
        }, [])
    );

    const [cards, groupings] = useMemo(() => {
        const _cards = Array.from(setStore.cards.values()) || []
        const _groupings = getDefaultGroupings();

        _cards.forEach(cd => {
            const gradeIndex = cd.currentGrade 
                ? gradeToIndexMapping[cd.currentGrade]
                : 0;
            _groupings[gradeIndex][0] += 1;
        })

        return [_cards, _groupings]
    }, [setStore.cards]);

    const cardsAced = cards.filter(c => c.currentGrade === SetCardGrade.A);
    const totalGrade = cards?.length 
        ? cardsAced.length / cards.length * 100
        : 0;

    const getLozengeStatus = () => {
        if (totalGrade > 90) return 'success';
        return 'info'
    }

    const reviseOnPress = () => {
        navigation.navigate(Screens.ReviseSet);
    }

    const openCardDetails = (card: SetCard) => {
        bottomSheetStore.setMessage({
            type: BottomSheetType.WordBottomSheet,
            data: card,
            onClose: () => {}
        })
    }

    const openSettings = () => {
        bottomSheetStore.setMessage({
            type: BottomSheetType.RevisionSettings
        });
    }

    return (
        <PageView>
            <View style={styles.header}>
                <Txt type='h1'>{i18.Revise}</Txt>
                <IconButton icon='settings' size='medium' onPress={openSettings} />
            </View>
            <View style={styles.setOverview}>
                {groupings.map((pair: [number, SetCardGrade]) => (
                    <View key={pair[1]} style={styles.gradeOverview}>
                        <Txt type='title'>{pair[0]}</Txt>
                        <VerticalSpacer spacing={4} />
                        <Lozenge status={gradeToStatusMapping[pair[1]] || 'unknown'}>{displayGradeMapping[pair[1]] || i18.New}</Lozenge>
                    </View>
                ))}
            </View>
            <VerticalSpacer spacing={16} />
            <Flex justifyCenter>
                <CircularProgress progress={totalGrade} status={getLozengeStatus()}/>
            </Flex>
            <VerticalSpacer spacing={32} />
            <View>
                <Flex justifyEnd>
                    <Txt type='title'>{i18.Cards} {cards.length}/{cards.length}</Txt>
                </Flex>
                <VerticalSpacer spacing={16} />
                <FlatList
                    style={{ minHeight: 300 }}
                    data={cards}
                    keyExtractor={(item, index) => '' + item.setCardId}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={<View style={{ height: 200 }} />}
                    renderItem={({ item: card }) => (
                        <TouchableWithoutFeedback onPress={() => openCardDetails(card)}>
                            <View style={styles.setCardOutline} key={card.name}>
                                <View style={styles.setCardOutlineLeft}>
                                    <Txt bold>{getName(card)}</Txt>
                                    <Txt>{card.meaning}</Txt>
                                </View>
                                <Flex>
                                    <Lozenge status={gradeToStatusMapping[card.currentGrade]}>{
                                        card.currentGrade !== SetCardGrade.New
                                        ? '' + card.currentGrade
                                        : 'N'
                                    }</Lozenge>
                                </Flex>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    windowSize={10}
                />
            </View>
            <View style={styles.footerButton}>
                <Button height={50} onPress={reviseOnPress}>{i18.Revise}</Button>
            </View>
        </PageView>
    )
}

export const ReviseScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={Screens.Revise}
                component={Revise}
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name={Screens.ReviseSet}
                component={ReviseSet}
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}
