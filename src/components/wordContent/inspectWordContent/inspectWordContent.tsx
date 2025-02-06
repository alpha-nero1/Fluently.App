import React, { useState } from 'react'
import { WordBase } from '~/api/types/wordBase';
import { Button } from '~/components/core/inputs/button/button';
import { SetCard } from '~/api/types/setCard';
import { useStores } from '~/lib/state/storeProvider';
import { SetApi } from '~/api/setApi';
import { Language } from '~/lib/types/enums/Language';
import { Txt } from '~/components/core/layout/txt/Txt';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Choose any icon set
import * as Speech from 'expo-speech';
import { LanguageSpeakMap } from '~/lib/constants/language';
import styles from './inspectWordContent.styles';
import { Colours } from '~/lib/themes/colours';

interface IInspectWordContentProps {
    word: WordBase | null;
    onClose: () => void;
}

const { width } = Dimensions.get("window");

/**
 * Content displayed when a word is clicked on.
 */
export const InspectWordContent = (props: IInspectWordContentProps) => {
    const { setStore, settingStore } = useStores();
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const { word } = props;

    if (!word) return null;

    const addToSet = async () => {
        // Add word to the current selected set.
        // If no set selected, will auto create for user first time ONLY.
        const languageSets = setStore.getLanguageSets(word.language);
        if (!languageSets.length) {
            // Create language set.
            const createdSet = await SetApi.create(Language[word.language], Language[word.language], word.language);
            setStore.addSet(createdSet);
            setStore.setSelectedSetId(createdSet.setId);
        }
        if (
            !setStore.selectedSetId
            || setStore.cards?.has(word.name)
        ) return;

        try {
            setIsLoading(true);
            // We have a selected set! let's add the card!.
            const setCards = await SetApi.addToSet(setStore.selectedSetId, [word as SetCard]);
            setStore.addCards(setCards);
            setIsLoading(false);
            props.onClose();
            Toast.show({
                type: 'success',
                text1: `${getName()} saved!`,
                visibilityTime: 2000,
                text1Style: { fontSize: 18, fontWeight: 'normal', fontFamily: 'Athelas-Regular' }
            });
        } catch (e) {
            setIsLoading(false);
            props.onClose();
            Toast.show({
                type: 'error',
                text1: 'Something went wrong',
                visibilityTime: 2000,
                text1Style: { fontSize: 18, fontWeight: 'normal', fontFamily: 'Athelas-Regular' }
            });
        }
    }

    const getName = () => {
        if (word?.definiteArticle) {
            return `(${word.definiteArticle}) ${word.name}`.trim()
        }
        if (word?.infinitive && word.infinitive !== word.name) {
            return `${word.name} (${word.infinitive})`.trim()
        }
        return word?.name?.trim();
    } 

    const getSpeakableName = () => {
        if (word?.definiteArticle) {
            return `${word.definiteArticle} ${word.name}`
        }
        return word?.name;
    }

    const getExplanation = () => {
        if (!word?.infinitive) return '';
        return word.explanation;
    }

    const getPronunciation = () => {
        if (!word?.pronunciation) return '';
        return word.pronunciation;
    }

    const speakOnPress = () => {
        setIsSpeaking(true);
        const langCode = LanguageSpeakMap[settingStore.learningLanguage];
        Speech.speak(getSpeakableName(), { 
            language: langCode, onDone: () => {
                setIsSpeaking(false);
            } 
        });
    }

    const speakColour = isSpeaking
        ? Colours.Grey
        : Colours.Dark;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: 40, paddingRight: 8 }} />
                <Txt type='h1'>{getName()}</Txt>
                <Pressable onPress={speakOnPress}>
                    <Icon name="volume-up" size={40} color={speakColour} style={{ paddingLeft: 8 }} />
                </Pressable>
            </View>
            <VerticalSpacer spacing={16} />
            <Txt type='subtitle'>Meaning</Txt>
            <Txt type='emphasised'>{word.meaning}</Txt>
            <Txt type='subtitle'>Explanation</Txt>
            <Txt type='emphasised'>{getExplanation()}</Txt>
            {word.pronunciation && (
                <>
                    <Txt type='subtitle'>Pronunciation</Txt>
                    <Txt type='emphasised'>{getPronunciation()}</Txt>
                </>
            )}
            {word.example && (
                <>
                    <Txt type='subtitle'>Example</Txt>
                    <Txt type='emphasised'>{word.example}</Txt>
                </>
            )}
            {word.infinitive && (
                <>
                    <Txt type='subtitle'>Infinitive</Txt>
                    <Txt type='emphasised'>{word.infinitive}</Txt>
                </>
            )}
            {word.versions && (
                <>
                    <Txt type='subtitle'>Versions</Txt>
                    <Txt type='emphasised'>{word.versions}</Txt>
                </>
            )}
            <VerticalSpacer spacing={32} />
            {
                !setStore.cards.has(word.name)
                ? (
                    <Button 
                        width={width - 32}
                        onPress={addToSet}
                        height={50}
                        isLoading={isLoading}
                    >   
                        Add to set
                    </Button>
                ) : null
            }
            <VerticalSpacer spacing={16} />
        </View>
    );
}
