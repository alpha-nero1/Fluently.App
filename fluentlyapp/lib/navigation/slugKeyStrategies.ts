import { ContentPageData } from "../types/ContentPageData";
import { ContentType } from "../types/enums/ContentType";
import { Language } from "../types/enums/Language";
import { LanguageLevel } from "../types/enums/LanguageLevel";
import { getEnumCaseInsensitive } from "../utils/enumUtils";

const languageExtractor = (data: ContentPageData, segment: string) => {
    const language = getEnumCaseInsensitive<Language>(Language, segment);
    if (language === Language.Unknown) {
        throw new Error('Invalid content key strategy for language level');
    }
    data.language = language;
}

const languageLevelExtractor = (data: ContentPageData, segment: string) => {
    const languageLevel = getEnumCaseInsensitive<LanguageLevel>(LanguageLevel, segment);
    if (!LanguageLevel[languageLevel]) {
        throw new Error('Invalid content key strategy for language level');
    }
    data.level = languageLevel;
}

/**
 * Get page data for content page.
 */
export const getContentPageData = (key: string): ContentPageData => {
    if (!key) {
        throw new Error('Key missing for page data');
    }
    const pageData = new ContentPageData();
    const split = key.split('-');

    if (split.length < 1) {
        throw new Error('Invalid content key strategy, not enough segments');
    }

    const guidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
    const matches = key.match(guidRegex);
    if (matches?.length)
    {
        pageData.id = matches[0];
    }

    // content/generated-italian-a1-la-storia-epica-awfawaw22131232
    if (split[0] === ContentType.Generated.toLowerCase() && split.length > 3) {
        pageData.type = ContentType.Generated;
        languageExtractor(pageData, split[1]);
        languageLevelExtractor(pageData, split[2]);
        // Get remaining data
        const remaining = split.slice(3);
        remaining.forEach((slice, i) => {
            pageData.title += ` ${slice}`;
        });

        return pageData;
    }

    // content/original-italian-la-storia-epica-awfawaw22131232
    if (split[0] === ContentType.Original.toLocaleLowerCase()) {
        pageData.type = ContentType.Original;
        languageExtractor(pageData, split[1]);
        // Get remaining data
        const remaining = split.slice(2);
        remaining.forEach((slice, i) => {
            pageData.title += ` ${slice}`;
        });

        return pageData;
    }

    throw new Error('Invalid content key strategy');
}
