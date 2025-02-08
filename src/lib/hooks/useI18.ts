import { useStores } from "../state/storeProvider"
import { Language } from "../types/enums/Language";
import { ITranslations } from "../types/language/ITranslations";
import bn from '~/assets/i18/bn.json';
import de from '~/assets/i18/de.json';
import el from '~/assets/i18/el.json';
import en from '~/assets/i18/en.json';
import es from '~/assets/i18/es.json';
import fa from '~/assets/i18/fa.json';
import fr from '~/assets/i18/fr.json';
import he from '~/assets/i18/he.json';
import hi from '~/assets/i18/hi.json';
import it from '~/assets/i18/it.json';
import ja from '~/assets/i18/ja.json';
import ko from '~/assets/i18/ko.json';
import mr from '~/assets/i18/mr.json';
import msa from '~/assets/i18/msa.json';
import nl from '~/assets/i18/nl.json';
import pl from '~/assets/i18/pl.json';
import pt from '~/assets/i18/pt.json';
import ru from '~/assets/i18/ru.json';
import sv from '~/assets/i18/sv.json';
import te from '~/assets/i18/te.json';
import th from '~/assets/i18/th.json';
import tr from '~/assets/i18/tr.json';
import uk from '~/assets/i18/uk.json';
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

/**
 * Internationalisation.
 */
export const useI18 = (): ITranslations => {
    const { settingStore } = useStores();
    const learnerLanguage = settingStore.learnerLanguage;
    const file = languageToTranslationMap[learnerLanguage];
    return file;
}