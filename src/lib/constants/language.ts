import { Language } from "../types/enums/Language";

export const LearningLanguages = [
    Language.English,
    Language.Italian,
    Language.German,
    Language.French,
    Language.Spanish,
    Language.Portugese
];

export const LearnerLanguages = [
    Language.English,
    Language.Italian,
    Language.German,
    Language.ChineseSimplified,
    Language.Hindi,
    Language.French,
    Language.Spanish,
    Language.Portugese,
    Language.Arabic,
    Language.Dutch,
    Language.Greek,
    Language.Farsi,
    Language.Cantonese
];

export const LanguageSpeakMap: { [key in Language]: string } = {
    [Language.Unknown]: '',
    [Language.English]: 'en-US',  // 'en-GB' for British English if needed
    [Language.Italian]: 'it-IT',
    [Language.German]: 'de-DE',
    [Language.French]: 'fr-FR',
    [Language.Spanish]: 'es-ES',  // Fixed from 'sp-SP' (correct code is 'es-ES')
    [Language.Greek]: 'el-GR',
    [Language.Hindi]: 'hi-IN',
    [Language.Vietnamese]: 'vi-VN',
    [Language.Portugese]: 'pt-PT',  // 'pt-BR' for Brazilian Portuguese
    [Language.Arabic]: 'ar-SA',
    [Language.Farsi]: 'fa-IR',
    [Language.Dutch]: 'nl-NL',
    [Language.Cantonese]: 'yue-HK', // Cantonese (Yue) in Hong Kong
    [Language.ChineseSimplified]: 'zh-CN' // Mandarin (Simplified)
  };
  

export const LanguageIsoCodeMap: { [key in Language]: string } = {
    [Language.Unknown]: '',
    [Language.English]: 'gb',  // UK (commonly used for English, but 'us' is also valid)
    [Language.Italian]: 'it',  // Italy
    [Language.German]: 'de',   // Germany
    [Language.French]: 'fr',   // France
    [Language.Spanish]: 'es',  // Spain
    [Language.Portugese]: 'pt', // Portugal
    [Language.Greek]: 'gr',    // Greece
    [Language.Hindi]: 'in',    // India
    [Language.Vietnamese]: 'vn', // Vietnam
    [Language.Arabic]: 'sa',   // Saudi Arabia (used for Arabic, but varies)
    [Language.Farsi]: 'ir',    // Iran (Persian/Farsi)
    [Language.Dutch]: 'nl',    // Netherlands
    [Language.Cantonese]: 'hk', // Hong Kong (Cantonese is mostly used there)
    [Language.ChineseSimplified]: 'cn' // China (Mandarin, Simplified Chinese)
};

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
