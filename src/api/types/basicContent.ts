import { ContentType } from "~/lib/types/enums/ContentType";
import { Language } from "~/lib/types/enums/Language";
import { LanguageLevel } from "~/lib/types/enums/LanguageLevel";
import { loadInstanceVariables } from "~/lib/utils/classUtils";

export class BasicContent {
    contentId: string = '';
    key: string = '';
    title: string = '';
    titleEnglish: string = '';
    author: string = '';
    type: ContentType = ContentType.Unknown;
    language: Language = Language.Unknown;
    languageLevel: LanguageLevel = LanguageLevel.Unknown;
  
    constructor(opts: Partial<BasicContent> ) {
        loadInstanceVariables(this, opts);
    }
  }