import { SetApi } from "~/api/setApi";
import { Observable } from "../observable";
import { Set } from '~/api/types/set';
import { Language } from "~/lib/types/enums/Language";
import { SetCard } from "~/api/types/setCard";

export interface SetState {
    sets: Map<number, Set>;
    cards: Map<string, SetCard>;
    selectedSetId?: number;
}

/**
 * Store to save sets inside.
 */
export class SetStore extends Observable<SetState> {
    private isInitialised?: boolean = false;

    constructor() {
        super({ sets: new Map<number, Set>(), cards: new Map<string, SetCard>() });
    }

    public get sets() {
        return this.getState().sets;
    }

    public get cards() {
        return this.getState().cards;
    }

    public get selectedSetId() {
        return this.getState().selectedSetId;
    }

    public get selectedSet() {
        if (!this.selectedSetId) return;
        return this.sets.get(this.selectedSetId);
    }

    public initialise = (language: Language = Language.Unknown) => {
        if (this.isInitialised) return;
        SetApi.list()
            .then((res) => {
                if (!res.data?.length) return;

                this.notify(() => {
                    res.data.forEach((st) => {
                        this.sets.set(st.setId, st);
                    });

                    if (!this.selectedSetId) {
                        this.resetSelectedSetId(language);
                    }
                });

                this.isInitialised = true;
            });
    }

    public initialiseFullSet = async (setId: number) => {
        SetApi.get(setId, true)
            .then((res) => {
                this.notify(() => {
                    // Now build the cards dictionary to go with it!
                    res.cards.forEach(card => {
                        this.cards.set(card.name, card);
                    });
                });
            });
    }

    public getLanguageSets(lang: Language) {
        let sets: Set[] = [];
        this.getState().sets.forEach(st => {
            if (st.language === lang) {
                sets.push(st);
            }
        });
        return sets;
    }

    public addCards(cards: SetCard[] = []) {
        this.notify(() => {
            cards.forEach(card => {
                console.log('aa adding card', card.name, card);
                this.cards.set(card.name, card);
            });
        });
    }

    public getLanguageSet(lang: Language): Set | null {
        let langSet: Set | null = null;
        this.getState().sets.forEach(st => {
            if (st.language === lang) {
                langSet = st;
            }
        })
        return langSet;
    }

    public hasLanguageSets(lang: Language) {
        return !!this.getLanguageSets(lang)?.length
    }

    public setSelectedSetId = (setId: number) => {
        this.notify(() => {
            this.getState().selectedSetId = setId;
        });
        this.initialiseFullSet(setId);
    }

    public resetSelectedSetId = (language: Language = Language.Unknown) => {
        const languageSets = this.getLanguageSets(language);
        if (language !== Language.Unknown && languageSets.length) {
            this.setSelectedSetId(languageSets[0].setId);
        }
    }

    public addSet = (set: Set) => {
        this.notify(() => {
            this.getState().sets.set(set.setId, set);
        });
    }

    public removeSet = (setId: number) => {
        this.notify(() => {
            this.getState().sets.delete(setId);
        });
    }
}
