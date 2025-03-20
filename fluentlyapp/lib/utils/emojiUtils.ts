import { Language } from "../types/enums/Language";

const map: { [key in Language] : string } = {
    [Language.Italian]: '🇮🇹',
    [Language.French]: '🇫🇷',
    [Language.Spanish]: '🇪🇸',
    [Language.German]: '🇩🇪',
    [Language.English]: '🇬🇧',
    [Language.Unknown]: '',
    [Language.Greek]: '',
    [Language.Hindi]: '',
    [Language.Vietnamese]: '',
    [Language.Portugese]: '',
    [Language.Arabic]: '',
    [Language.Farsi]: '',
    [Language.Dutch]: '',
    [Language.Danish]: '',
    [Language.Cantonese]: '',
    [Language.ChineseSimplified]: ''
};

export const mapLanguageToEmoji = (language: Language) => {
    return map[language];
}