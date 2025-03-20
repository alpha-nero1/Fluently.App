import { Language } from "~/lib/types/enums/Language";
import { loadInstanceVariables } from "~/lib/utils/classUtils";

/**
 * Base for word details. Used by both "Word" and "SetCard".
 */
export abstract class WordBase {
    name: string = "";
    meaning: string = "";
    explanation: string = "";
    pronunciation: string = "";
    example: string = "";
    infinitive?: string = "";
    definiteArticle?: string = "";
    versions?: string = "";
    language: Language = Language.Unknown;
    learnerLanguage: Language = Language.Unknown;

    constructor(opts?: Partial<WordBase>) {
        loadInstanceVariables(this, opts || {});
    }
}