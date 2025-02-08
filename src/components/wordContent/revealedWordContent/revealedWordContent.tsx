import React, { useMemo } from 'react';
import { WordBase } from '~/api/types/wordBase';
import { Flex } from '~/components/core/layout/flex/flex';
import { Txt } from '~/components/core/layout/txt/Txt';
import { useI18 } from '~/lib/hooks/useI18';

interface Props {
    word: WordBase | null;
}

/**
 * Content that is shown on the back of a card when studying.
 */
export const RevealedWordContent = ({ word }: Props) => {
    const i18 = useI18();
    if (!word) return null;

    return (
        <Flex column flex={1} alignCenter justifyCenter>
            <Flex>
                <Txt type='h1'>{word.meaning}</Txt>
            </Flex>
            {word.pronunciation && (
                <>
                    <Txt type='subtitle'>{i18.Pronunciation}</Txt>
                    <Txt type='emphasised'>{word.pronunciation}</Txt>
                </>
            )}
            {word.example && (
                <>
                    <Txt type='subtitle'>{i18.Example}</Txt>
                    <Txt type='emphasised'>{word.example}</Txt>
                </>
            )}
            {word.explanation && (
                <>
                    <Txt type='subtitle'>{i18.Explanation}</Txt>
                    <Txt type='emphasised'>{word.explanation}</Txt>
                </>
            )}
            {word.infinitive && (
                <>
                    <Txt type='subtitle'>{i18.Infinitive}</Txt>
                    <Txt type='emphasised'>{word.infinitive}</Txt>
                </>
            )}
            {word.versions && (
                <>
                    <Txt type='subtitle'>{i18.Versions}</Txt>
                    <Txt type='emphasised'>{word.versions}</Txt>
                </>
            )}
        </Flex>
    );
}
