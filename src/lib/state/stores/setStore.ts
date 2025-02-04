import { SetApi } from "~/api/setApi";
import { Observable } from "../observable";
import { Set } from '~/api/types/set';
import { Language } from "~/lib/types/enums/Language";

export interface SetState {
    sets: Map<number, Set>;
    selectedSetId?: number;
}

/**
 * Store to save sets inside.
 */
export class SetStore extends Observable<SetState> {
    constructor() {
        super({ sets: new Map<number, Set>() });
    }

    public get sets() {
        return this.getState().sets;
    }

    public get selectedSetId() {
        return this.getState().selectedSetId;
    }

    public get selectedSet() {
        if (!this.selectedSetId) return;
        return this.getState().sets.get(this.selectedSetId);
    }

    public initialise = (language: Language = Language.Unknown) => {
        SetApi.list()
        .then((res) => {
            if (!res.data?.length) return;

            this.notify(() => {
                res.data.forEach((st) => {
                    this.getState().sets.set(st.setId, st);
                });

                if (!this.selectedSetId) {
                    this.resetSelectedSetId(language);
                }
            });
        });
    }

    public getLanguageSets(lang: Language) {
        let sets: Set[] = [];
        this.getState().sets.forEach(st => {
            if (st.language === lang) {
                sets.push(st);
            }
        })
        return sets;
    }

    public hasLanguageSets(lang: Language) {
        return !!this.getLanguageSets(lang)?.length
    }

    public setSelectedSetId = (setId: number) => {
        this.notify(() => {
            this.getState().selectedSetId = setId;
        });
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
