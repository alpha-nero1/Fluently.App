import React, { useState } from 'react'
import { WordBase } from '~/api/types/wordBase';
import { SetCard } from '~/api/types/setCard';
import { useStores } from '~/lib/state/storeProvider';
import { Language } from '~/lib/types/enums/Language';
import { View } from 'react-native';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import styles from './inspectWordContent.styles';
import { useI18 } from '~/lib/hooks/useI18';
import { useSetApi } from '~/api/setApi';
import { showToast } from '~/lib/utils/toastUtils';
import { InspectWordActions } from './inspectWordActions/inspectWordActions';
import { InspectWordDetails } from './inspectWordDetails/inspectWordDetails';
import { getName } from '~/lib/utils/wordUtils';

interface IInspectWordContentProps {
    word: WordBase | null;
    onEdit: () => void;
    onClose: () => void;
}

/**
 * Used to display a word when it has been clicked on.
 */
export const InspectWordContent = (props: IInspectWordContentProps) => {
    const { setStore, settingStore } = useStores();
    const [isLoading, setIsLoading] = useState(false);
    const setApi = useSetApi(settingStore.accessToken);
    const i18 = useI18();
    const { word } = props;

    if (!word) return null;
    const wordSaved = setStore.hasCard(word.name);

    const addToSet = async () => {
        const language = word.language;
        const languageDesc = Language[word.language];
        // Add word to the current selected set.
        // If no set selected, will auto create for user first time ONLY.
        const languageSets = setStore.getLanguageSets(word.language);
        if (!languageSets.length) {
            // Create language set.
            const createdSet = await setApi.create(languageDesc, languageDesc, word.language);
            setStore.addSet(createdSet);
            await setStore.initialise(language, settingStore.accessToken);
        }
        if (
            !setStore.selectedSetId
            || setStore.hasCard(word.name)
        ) return;

        try {
            setIsLoading(true);
            // We have a selected set! let's add the card!.
            const setCards = await setApi.addToSet(setStore.selectedSetId, [word as SetCard]);
            setStore.addCards(setCards);
            setIsLoading(false);
            props.onClose();
            showToast('success', [i18.render(i18._0_saved_exc, getName(word))])
        } catch (e) {
            setIsLoading(false);
            props.onClose();
            showToast('error', [i18.Something_went_wrong]);
        }
    }

    const removeFromSet = () => {
        if (setStore.selectedSetId) {
            props.onClose();
            setApi.removeFromSet(setStore.selectedSetId, [(word as SetCard).setCardId]);
            setStore.removeCards([word.name]);
        }
    }

    return (
        <View style={styles.container}>
            <InspectWordDetails word={word} />
            <VerticalSpacer spacing={32} />
            <InspectWordActions 
                name={getName(word)}
                word={word}
                saved={wordSaved}
                isLoading={isLoading}
                onAdd={addToSet}
                onRemove={removeFromSet}
                onEdit={props.onEdit}
            />
            <VerticalSpacer spacing={16} />
        </View>
    );
}
