import { getLocales } from "react-native-localize";
import { languageCodeToLanguage } from "~/lib/hooks/useI18";
import { Language } from '../types/enums/Language';

export const getDefaultLearnerLanguage = () => {
    const languageCode = getLocales()[0].languageCode || 'en';
    return languageCodeToLanguage[languageCode];
}

export const getDefaultLearningLanguage = () => {
    return (
        getDefaultLearnerLanguage() === Language.English
        ? Language.Italian
        : Language.English
    )
}
