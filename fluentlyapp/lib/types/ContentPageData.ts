import { ContentType } from "./enums/ContentType";
import { Language } from "./enums/Language";
import { LanguageLevel } from "./enums/LanguageLevel";

export class ContentPageData {
    title: string = '';
    type: ContentType = ContentType.Generated;
    id: string = '';
    language: Language = Language.Italian;
    level: LanguageLevel = LanguageLevel.Unknown;

    constructor(data?: Partial<ContentPageData>) {

    }
}