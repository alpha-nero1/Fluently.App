import { Language } from "~/lib/types/enums/Language";
import { Observable } from "../observable";
import { WordDictionary } from "~/api/types/wordDictionary";

export interface DictionaryState {
    dictionaries: Map<Language, WordDictionary>;
}

/**
 * Store to save sets inside.
 */
export class DictionaryStore extends Observable<DictionaryState> {
    constructor() {
        super({ dictionaries: new Map<Language, WordDictionary>() });
    }

    public get dictionaries() {
        return this.getState().dictionaries;
    }

    public updateDictionary(lang: Language, dict: WordDictionary) {
        this.notify(() => {
            this.dictionaries.set(lang, dict);
        })
    }

    public getDictionary(lang: Language) {
        return this.dictionaries.get(lang);
    }
}