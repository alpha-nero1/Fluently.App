import React from 'react'
import { Button, View } from 'react-native';
import { Word } from '~/api/types/word';
import { BottomSheetModal } from '~/components/core/layout/bottomSheetModal/bottomSheetModal'
import { Txt } from '~/components/core/layout/txt/Txt';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';

import styles from './wordBottomSheet.styles';

interface IWordBottomSheetProps {
    isOpen?: boolean;
    word: Word | null;
    onClose: () => void;
}

export const WordBottomSheet = ({ word, onClose, isOpen }: IWordBottomSheetProps) => {
    const getName = () => {
        if (word?.definiteArticle) {
            return `(${word.definiteArticle}) ${word.name}`
        }
        if (word?.infinitive && word.infinitive !== word.name) {
            return `${word.name} (${word.infinitive})`
        }
        return word?.name;
    } 

    const getExplanation = () => {
        if (!word?.infinitive) return '';
        return word.explanation;
    }

    const getPronunciation = () => {
        if (!word?.infinitive) return '';
        return word.explanation;
    }

    return (
        <BottomSheetModal
            isOpen={isOpen && !!word}
            onClose={onClose}
        >
            <View style={styles.view}>
                <Txt type='h1'>{getName()}</Txt>
                <Txt type='subtitle'>Meaning</Txt>
                <Txt type='emphasised' >{word?.meaning}</Txt>
                {
                    getExplanation()
                    ? (
                        <>
                            <Txt type='subtitle'>Explanation</Txt>
                            <Txt type='emphasised' >{word?.explanation}</Txt>
                        </>
                    ) : null
                }
                {
                    getPronunciation()
                    ? (
                        <>
                            <Txt type='subtitle'>Pronunciation</Txt>
                            <Txt type='emphasised' >{word?.pronunciation}</Txt>
                        </>
                    ) : null
                }
                
                <Button title='Add to set' />
                <VerticalSpacer spacing={32} />
            </View>
        </BottomSheetModal>
    )
}
