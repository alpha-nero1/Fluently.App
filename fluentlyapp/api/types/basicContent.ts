import { ContentType } from "~/lib/types/enums/ContentType";
import { Language } from "~/lib/types/enums/Language";
import { LanguageLevel } from "~/lib/types/enums/LanguageLevel";
import { loadInstanceVariables } from "~/lib/utils/classUtils";
import { Category } from "./category";

export class BasicContent {
    contentId: string = '';
    coverImageUrl: string = '';
    key: string = '';
    title: string = '';
    titleEnglish: string = '';
    author: string = '';
    type: ContentType = ContentType.Unknown;
    language: Language = Language.Unknown;
    languageLevel: LanguageLevel = LanguageLevel.Unknown;
    category: Category = null!
  
    constructor(opts: Partial<BasicContent> ) {
        loadInstanceVariables(this, opts);
    }
  }