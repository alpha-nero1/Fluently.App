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

export const DialingCodeToISO = new Map<string, string>([
    ["+93", "AF"], // Afghanistan
    ["+355", "AL"], // Albania
    ["+213", "DZ"], // Algeria
    ["+376", "AD"], // Andorra
    ["+244", "AO"], // Angola
    ["+54", "AR"], // Argentina
    ["+374", "AM"], // Armenia
    ["+61", "AU"], // Australia
    ["+43", "AT"], // Austria
    ["+994", "AZ"], // Azerbaijan
    ["+973", "BH"], // Bahrain
    ["+880", "BD"], // Bangladesh
    ["+375", "BY"], // Belarus
    ["+32", "BE"], // Belgium
    ["+501", "BZ"], // Belize
    ["+229", "BJ"], // Benin
    ["+975", "BT"], // Bhutan
    ["+591", "BO"], // Bolivia
    ["+387", "BA"], // Bosnia and Herzegovina
    ["+267", "BW"], // Botswana
    ["+55", "BR"], // Brazil
    ["+359", "BG"], // Bulgaria
    ["+226", "BF"], // Burkina Faso
    ["+855", "KH"], // Cambodia
    ["+237", "CM"], // Cameroon
    ["+1", "CA"], // Canada
    ["+56", "CL"], // Chile
    ["+86", "CN"], // China
    ["+57", "CO"], // Colombia
    ["+506", "CR"], // Costa Rica
    ["+385", "HR"], // Croatia
    ["+53", "CU"], // Cuba
    ["+357", "CY"], // Cyprus
    ["+420", "CZ"], // Czech Republic
    ["+45", "DK"], // Denmark
    ["+1", "DO"], // Dominican Republic
    ["+593", "EC"], // Ecuador
    ["+20", "EG"], // Egypt
    ["+372", "EE"], // Estonia
    ["+251", "ET"], // Ethiopia
    ["+679", "FJ"], // Fiji
    ["+358", "FI"], // Finland
    ["+33", "FR"], // France
    ["+49", "DE"], // Germany
    ["+30", "GR"], // Greece
    ["+852", "HK"], // Hong Kong
    ["+36", "HU"], // Hungary
    ["+354", "IS"], // Iceland
    ["+91", "IN"], // India
    ["+62", "ID"], // Indonesia
    ["+98", "IR"], // Iran
    ["+964", "IQ"], // Iraq
    ["+353", "IE"], // Ireland
    ["+972", "IL"], // Israel
    ["+39", "IT"], // Italy
    ["+1", "JM"], // Jamaica
    ["+81", "JP"], // Japan
    ["+962", "JO"], // Jordan
    ["+7", "KZ"], // Kazakhstan
    ["+254", "KE"], // Kenya
    ["+965", "KW"], // Kuwait
    ["+856", "LA"], // Laos
    ["+371", "LV"], // Latvia
    ["+961", "LB"], // Lebanon
    ["+218", "LY"], // Libya
    ["+423", "LI"], // Liechtenstein
    ["+370", "LT"], // Lithuania
    ["+352", "LU"], // Luxembourg
    ["+60", "MY"], // Malaysia
    ["+960", "MV"], // Maldives
    ["+52", "MX"], // Mexico
    ["+377", "MC"], // Monaco
    ["+976", "MN"], // Mongolia
    ["+212", "MA"], // Morocco
    ["+977", "NP"], // Nepal
    ["+31", "NL"], // Netherlands
    ["+64", "NZ"], // New Zealand
    ["+234", "NG"], // Nigeria
    ["+850", "KP"], // North Korea
    ["+47", "NO"], // Norway
    ["+968", "OM"], // Oman
    ["+92", "PK"], // Pakistan
    ["+507", "PA"], // Panama
    ["+675", "PG"], // Papua New Guinea
    ["+595", "PY"], // Paraguay
    ["+51", "PE"], // Peru
    ["+63", "PH"], // Philippines
    ["+48", "PL"], // Poland
    ["+351", "PT"], // Portugal
    ["+974", "QA"], // Qatar
    ["+40", "RO"], // Romania
    ["+7", "RU"], // Russia
    ["+250", "RW"], // Rwanda
    ["+966", "SA"], // Saudi Arabia
    ["+221", "SN"], // Senegal
    ["+381", "RS"], // Serbia
    ["+65", "SG"], // Singapore
    ["+421", "SK"], // Slovakia
    ["+386", "SI"], // Slovenia
    ["+27", "ZA"], // South Africa
    ["+82", "KR"], // South Korea
    ["+34", "ES"], // Spain
    ["+94", "LK"], // Sri Lanka
    ["+249", "SD"], // Sudan
    ["+46", "SE"], // Sweden
    ["+41", "CH"], // Switzerland
    ["+963", "SY"], // Syria
    ["+886", "TW"], // Taiwan
    ["+992", "TJ"], // Tajikistan
    ["+255", "TZ"], // Tanzania
    ["+66", "TH"], // Thailand
    ["+216", "TN"], // Tunisia
    ["+90", "TR"], // Turkey
    ["+256", "UG"], // Uganda
    ["+380", "UA"], // Ukraine
    ["+971", "AE"], // United Arab Emirates
    ["+44", "GB"], // United Kingdom
    ["+1", "US"], // United States
    ["+598", "UY"], // Uruguay
    ["+998", "UZ"], // Uzbekistan
    ["+58", "VE"], // Venezuela
    ["+84", "VN"], // Vietnam
    ["+967", "YE"], // Yemen
    ["+260", "ZM"], // Zambia
    ["+263", "ZW"], // Zimbabwe
]);

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
