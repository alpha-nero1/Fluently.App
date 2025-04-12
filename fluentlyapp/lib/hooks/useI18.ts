import { useStores } from "../state/storeProvider"
import { Language } from "../types/enums/Language";
import { ITranslations } from "../types/language/ITranslations";
import de from '~/assets/i18/de.json';
import el from '~/assets/i18/el.json';
import en from '~/assets/i18/en.json';
import es from '~/assets/i18/es.json';
import fa from '~/assets/i18/fa.json';
import fr from '~/assets/i18/fr.json';
import hi from '~/assets/i18/hi.json';
import it from '~/assets/i18/it.json';
import msa from '~/assets/i18/msa.json';
import nl from '~/assets/i18/nl.json';
import pt from '~/assets/i18/pt.json';
import vi from '~/assets/i18/vi.json';
import yue from '~/assets/i18/yue.json';
import zh from '~/assets/i18/zh.json';

const languageToTranslationMap: { [key in Language]: any } = {
    [Language.Unknown]: "",
    [Language.English]: en,
    [Language.Italian]: it,
    [Language.German]: de,
    [Language.French]: fr,
    [Language.Spanish]: es,
    [Language.Greek]: el,
    [Language.Hindi]: hi,
    [Language.Vietnamese]: vi,
    [Language.Portugese]: pt,
    [Language.Arabic]: msa,
    [Language.Farsi]: fa,
    [Language.Dutch]: nl,
    [Language.Cantonese]: yue,
    [Language.ChineseSimplified]: zh
}

export const languageCodeToLanguage: { [key in string]: Language } = {
    'en': Language.English,
    'it': Language.Italian,
    'de': Language.German,
    'fr': Language.French,
    'es': Language.Spanish,
    'el': Language.Greek,
    'hi': Language.Hindi,
    'nl': Language.Dutch,
    'zh': Language.ChineseSimplified,
}

export type I18 = ITranslations & {
    render: (template: string, ...data: any[]) => string;
}

/**
 * Internationalisation.
 */
export const useI18 = (): I18 => {
    const { settingStore } = useStores();
    const learnerLanguage = settingStore.learnerLanguage;
    const defaultFile = en;
    const file = languageToTranslationMap[learnerLanguage];
    const translations = {
        ...defaultFile,
        ...file
    };
    translations.render = (template: string, ...data: any[]) => {
        let rendered = '';
        (data || []).forEach(dataItem => {
            rendered = template.replace(/{\d+}/, '' + dataItem);
        })
        return rendered;
    }
    return translations;
}