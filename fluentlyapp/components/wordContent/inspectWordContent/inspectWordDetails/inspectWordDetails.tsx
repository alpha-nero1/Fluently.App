import { WordBase } from "~/api/types/wordBase";
import { Txt } from "~/components/core/layout/txt/Txt";
import { VerticalSpacer } from "~/components/core/layout/verticalSpacer/verticalSpacer";
import { useI18 } from "~/lib/hooks/useI18";
import { SpeakIcon } from "../../speakIcon/speakIcon";
import { View } from "react-native";
import { useStores } from "~/lib/state/storeProvider";
import { Flex } from "~/components/core/layout/flex/flex";

interface IInspectWordDetailsProps {
    word: WordBase;
    isEditing?: boolean;
    isLoading?: boolean;
}

/**
 * Displays either the word content details or the edit form.
 */
export const InspectWordDetails = ({ word, ...props }: IInspectWordDetailsProps) => {
    const i18 = useI18();
    const { settingStore } = useStores();
    
    const getExplanation = () => {
        if (!word?.infinitive) return '';
        return word.explanation;
    }

    const getPronunciation = () => {
        if (!word?.pronunciation) return '';
        return word.pronunciation;
    }

    const getSpeakableName = () => {
        if (word?.definiteArticle) {
            return `${word.definiteArticle} ${word.name}`
        }
        return word?.name;
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

    return (
        <>
            <Flex alignCenter justifySpaceBetween flex={1}>
                <View style={{ width: 40 }}/>
                <Txt type='h1'>{getName()}</Txt>
                <SpeakIcon text={getSpeakableName()} language={settingStore.learningLanguage} />
            </Flex>
            <VerticalSpacer spacing={16} />
            <Txt type='subtitle'>{i18.Meaning}</Txt>
            <Txt type='emphasised'>{word.meaning}</Txt>
            <Txt type='subtitle'>{i18.Explanation}</Txt>
            <Txt type='emphasised'>{getExplanation()}</Txt>
            {word.pronunciation && (
                <>
                    <Txt type='subtitle'>{i18.Pronunciation}</Txt>
                    <Txt type='emphasised'>{getPronunciation()}</Txt>
                </>
            )}
            {word.example && (
                <>
                <Txt type='subtitle'>{i18.Example}</Txt>
                    <Txt type='emphasised'>{word.example}</Txt>
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
        </>
    );
}