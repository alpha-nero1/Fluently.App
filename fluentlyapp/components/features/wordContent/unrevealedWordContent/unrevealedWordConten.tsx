import React from 'react';
import { WordBase } from '~/api/types/wordBase';
import { Flex } from '~/components/core/layout/flex/flex';
import { Txt } from '~/components/core/layout/txt/Txt';
import { useI18 } from '~/lib/hooks/useI18';

interface Props {
    word: WordBase | null;
}

/**
 * Content that is shown on the front of a card when studying.
 */
export const UnrevealedWordContent = ({ word }: Props) => {
    const i18 = useI18();
    if (!word) return null;
 
    return (
        <Flex column flex={1} alignCenter justifyCenter>
            <Txt type='h2'>{word.definiteArticle ? `(${word.definiteArticle}) ${word.name}` : word.name}</Txt>
            {word.pronunciation ? (
                <>
                    <Txt type='subtitle'>{i18.Pronunciation}</Txt>
                    <Txt type='emphasised'>{word.pronunciation}</Txt>
                </>
            ) : null}
            {word.example ? (
                <>
                    <Txt type='subtitle'>{i18.Example}</Txt>
                    <Txt type='emphasised'>{word.example}</Txt>
                </>
            ) : null}
        </Flex>
    );
}
