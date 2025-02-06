import { Language } from "../types/enums/Language";

export const Languages = [
    Language.English,
    Language.Italian,
    Language.German,
    Language.French,
    Language.Spanish,
    Language.Portugese
];

export const LanguageSpeakMap: { [key in Language]: string } = {
    [Language.Unknown]: '',
    [Language.English]: 'en-EN',
    [Language.Italian]: "it-IT",
    [Language.German]: "de-DE",
    [Language.French]: "fr-FR",
    [Language.Spanish]: "sp-SP",
    [Language.Greek]: "",
    [Language.Hindi]: "",
    [Language.Vietnamese]: "",
    [Language.Portugese]: "",
    [Language.Arabic]: "",
    [Language.Farsi]: "",
    [Language.Dutch]: "",
    [Language.Danish]: "",
    [Language.Cantonese]: "",
    [Language.ChineseSimplified]: ""
}

export const LanguageIsoCodeMap: { [key in Language]: string } = {
    [Language.Unknown]: '',
    [Language.English]: 'gb',
    [Language.Italian]: "it",
    [Language.German]: "de",
    [Language.French]: "fr",
    [Language.Spanish]: "es",
    [Language.Portugese]: "pt",
    [Language.Greek]: "",
    [Language.Hindi]: "",
    [Language.Vietnamese]: "",
    [Language.Arabic]: "",
    [Language.Farsi]: "",
    [Language.Dutch]: "",
    [Language.Danish]: "",
    [Language.Cantonese]: "",
    [Language.ChineseSimplified]: ""
}

export const fluentlyInDifferentLanguages = [
    "Fluently", 
    "Fluido", 
    "Couramment", 
    "Fließend", 
    "Fluentemente",
    "Fluentemente", 
    "Vloeiend", 
    "Бегло", 
    "流利地", 
    "流暢に",
    "유창하게", 
    "धाराप्रवाह", 
    "بطلاقة", 
    "Akıcı bir şekilde", 
    "שוטף",
    "คล่องแคล่ว", 
    "Flytande", 
    "Płynnie", 
    "Άπταιστα", 
    "Trôi chảy"
];
