import { Language } from "~/lib/types/enums/Language";
import { Observable } from "../observable";
import { getDefaultLearnerLanguage, getDefaultLearningLanguage } from "~/lib/utils/languageUtils";
import { usersApi } from "~/api/usersApi";
import { AppUser } from "~/api/types/appUser";
import { SetReviewStrategy } from "~/lib/types/enums/SetReviewStrategy";

export interface SettingState {
    accessToken: string;
    learningLanguage: Language;
    learnerLanguage: Language;
    revisionSize: number;
    revisionStrategy: SetReviewStrategy;
}

const defaultRevisionSize = 10;

export enum PersistableKeys {
    LearningLanguage = 'SettingStore.learningLanguage',
    LearnerLanguage = 'SettingStore.learnerLanguage',
    AccessToken = 'SettingStore.accessToken',
    RevisionSize = 'SettingStore.revisionSize',
    RevisionStrategy = 'SettingStore.revisionStrategy'
}

export class SettingStore extends Observable<SettingState> {
    constructor() {
        super({ 
            accessToken: '',
            learnerLanguage: getDefaultLearnerLanguage(), 
            learningLanguage: getDefaultLearningLanguage(),
            revisionSize: defaultRevisionSize,
            revisionStrategy: SetReviewStrategy.FluentlySsr
        });
    }

    public get learnerLanguage() {
        return this.getState().learnerLanguage;
    }

    public get learningLanguage() {
        return this.getState().learningLanguage;
    }

    public get accessToken() {
        return this.getState().accessToken;
    }

    public get revisionSize() {
        return this.getState().revisionSize;
    }

    public get revisionStrategy() {
        return this.getState().revisionStrategy;
    }

    public initialise = () => {
        this.load(PersistableKeys.LearningLanguage)
            .then(lang => {
                if (lang) this.setLearningLanguage(lang as Language);
            });
        this.load(PersistableKeys.LearnerLanguage)
            .then(lang => {
                if (lang) this.setLearnerLanguage(lang as Language);
            });
        this.load(PersistableKeys.AccessToken)
            .then(token => {
                if (token) this.setAccessToken(token);
            });
        this.load(PersistableKeys.RevisionSize)
            .then(size => {
                if (size) this.setRevisionSize(+size);
            });
        this.load(PersistableKeys.RevisionStrategy)
            .then(strategy => {
                if (strategy) this.setRevisionStrategy(strategy as SetReviewStrategy);
            });
    }

    public setLearningLanguage = (language: Language, sync = false) => {
        this.notify(() => {
            this.getState().learningLanguage = language;
            this.persist(PersistableKeys.LearningLanguage, language);
        });
        if (sync) {
            usersApi.sync(new AppUser({ learningLanguage: language }), this.accessToken);
        }
    }

    public setLearnerLanguage = (language: Language, sync = false) => {
        this.notify(() => {
            this.getState().learnerLanguage = language;
            this.persist(PersistableKeys.LearnerLanguage, language);
        });
        if (sync) {
            usersApi.sync(new AppUser({ learnerLanguage: language }), this.accessToken);
        }
    }

    public setAccessToken = (token: string) => {
        this.notify(() => {
            this.getState().accessToken = token;
            this.persist(PersistableKeys.AccessToken, token);
        });
    }

    public setRevisionSize = (size: number) => {
        this.notify(() => {
            this.getState().revisionSize = size;
            this.persist(PersistableKeys.RevisionSize, size);
        });
    }

    public setRevisionStrategy = (strategy: SetReviewStrategy) => {
        this.notify(() => {
            this.getState().revisionStrategy = strategy;
            this.persist(PersistableKeys.RevisionStrategy, strategy);
        });
    }
}
