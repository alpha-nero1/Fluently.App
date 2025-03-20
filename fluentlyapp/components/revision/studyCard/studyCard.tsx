import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SetCard } from '~/api/types/setCard';
import { FlipCard } from '~/components/core/layout/flipCard/flipCard';
import { SetCardGrade } from '~/lib/types/enums/SetCardGrade';
import { UnrevealedWordContent } from '~/components/wordContent/unrevealedWordContent/unrevealedWordConten';
import { RevealedWordContent } from '~/components/wordContent/revealedWordContent/revealedWordContent';
import { Flex } from '~/components/core/layout/flex/flex';
import { Txt } from '~/components/core/layout/txt/Txt';
import { useI18 } from '~/lib/hooks/useI18';

import styleFunc from './studyCard.styles';
import { useColouredStyles } from '~/lib/hooks/useColours';

interface IStudyCardProps {
    height: number;
    width: number;
    setCard: SetCard;
    feedbackOnClick: (grade: SetCardGrade) => void;
}

interface IFeedbackButtonProps {
    label: string;
    onPress: () => void;
    style: any;
}

const FeedbackButton = ({ label, onPress, style }: IFeedbackButtonProps) => (
    <TouchableOpacity style={[style]} onPress={onPress}>
        <Txt type='title' style={{ color: '#333'}} disableStandardSpacing>{label}</Txt>
    </TouchableOpacity>
);

/**
 * Review a word.
 */
export function StudyCard({ setCard, height, width, feedbackOnClick }: IStudyCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const i18 = useI18();
    const styles = useColouredStyles(styleFunc);

    const _feedbackOnClick = (grade: SetCardGrade) => {
        setIsFlipped(!isFlipped);
        feedbackOnClick(grade);
    } 

    return (
        <FlipCard
            isFlipped={isFlipped}
            onFlip={setIsFlipped}
            height={height}
            width={width}
            frontContent={
                <Flex column alignCenter justifyCenter>
                    <UnrevealedWordContent word={setCard} />
                </Flex>
            }
            backContent={
                <Flex column alignCenter>
                    <Flex flex={2} column justifyCenter alignCenter>
                        <RevealedWordContent word={setCard} />
                    </Flex>
                    <View style={styles.feedbackSection}>
                        <FeedbackButton label={i18.Fail} onPress={() => _feedbackOnClick(SetCardGrade.D)} style={[styles.feedbackButton, styles.fail]} />
                        <FeedbackButton label={i18.Hard} onPress={() => _feedbackOnClick(SetCardGrade.C)} style={[styles.feedbackButton, styles.hard]} />
                        <FeedbackButton label={i18.Okay} onPress={() => _feedbackOnClick(SetCardGrade.B)} style={[styles.feedbackButton, styles.okay]} />
                        <FeedbackButton label={i18.Easy} onPress={() => _feedbackOnClick(SetCardGrade.A)} style={[styles.feedbackButton, styles.easy]} />
                    </View>
                </Flex>
            }
        />
    );
}
