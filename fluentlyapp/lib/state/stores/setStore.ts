import { useSetApi } from "~/api/setApi";
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

    /**
     * Load in the set for this language.
     */
    public initialise = (language: Language = Language.Unknown, accessToken: string) => {
        return new Promise((resolve, reject) => {
            useSetApi(accessToken).list()
                .then((res) => {
                    if (!res.data?.length) return;

                    this.notify(() => {
                        res.data.forEach((st) => {
                            this.sets.set(st.setId, st);
                        });
                    });
                    this.setLanguageSet(language, accessToken);
                    return resolve(undefined);
                })
                .catch(reject)
        });
    }

    /**
     * Load cards in.
     */
    public initialiseSetCards = async (setId: number, accessToken: string) => {
        if (!setId) {
            this.setCards([]);
            return;
        }
        useSetApi(accessToken).listCards(setId, [], 0, 100000)
            .then((res) => {
                this.setCards(res.data);
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

    public setCards(cards: SetCard[] = []) {
        this.notify(() => {
            this.getState().cards = new Map<string, SetCard>();

            cards.forEach(card => {
                this.getState().cards.set(card.name, card);
            });
        });
    }

    public removeCards(cards: string[] = []) {
        this.notify(() => {
            cards.forEach(card => {
                this.getState().cards.delete(card);
            });
            this.getState().cards = new Map<string, SetCard>(this.cards);
        });
    }

    public addCards(cards: SetCard[] = []) {
        this.notify(() => {
            cards.forEach(card => {
                this.getState().cards.set(card.name, card);
            });
            this.getState().cards = new Map<string, SetCard>(this.getState().cards);
        });
    }

    public hasCard(name: string) {
        return this.getState().cards.has(name);
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

    private setSelectedSetId = (setId: number, accessToken: string) => {
        this.notify(() => {
            this.getState().selectedSetId = setId;
        });
    }

    private setLanguageSet = (language: Language = Language.Unknown, accessToken: string) => {
        const languageSets = this.getLanguageSets(language);
        const setId = languageSets.length ? languageSets[0].setId : 0
        this.setSelectedSetId(setId, accessToken);
        this.initialiseSetCards(setId, accessToken);
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
