import { Language } from "~/lib/types/enums/Language";
import { loadInstanceVariables } from "~/lib/utils/classUtils";
import { SetCard } from "./setCard";

export class Set {
    setId: number = 0;
    title: string = '';
    language: Language = Language.Unknown;
    cards: SetCard[] = [];

    constructor(opts?: Partial<Set>) {
        loadInstanceVariables(this, opts || {});
    }
}