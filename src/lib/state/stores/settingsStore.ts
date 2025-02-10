import { Language } from "~/lib/types/enums/Language";
import { Observable } from "../observable";
import { getDefaultLearnerLanguage, getDefaultLearningLanguage } from "~/lib/utils/languageUtils";

export interface SettingState {
    accessToken: string;
    learningLanguage: Language;
    learnerLanguage: Language;
}

export class SettingStore extends Observable<SettingState> {
    constructor() {
        super({ 
            accessToken: '',
            learnerLanguage: getDefaultLearnerLanguage(), 
            learningLanguage: getDefaultLearningLanguage()
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

    public initialise = () => {
        this.load('SettingsStore.learningLanguage')
            .then(lang => {
                if (lang) this.setLearningLanguage(lang as Language);
            });
        this.load('SettingsStore.learnerLanguage')
            .then(lang => {
                if (lang) this.setLearnerLanguage(lang as Language);
            });
        this.load('SettingsStore.accessToken')
            .then(token => {
                if (token) this.setAccessToken(token);
            });
    }

    public setLearningLanguage = (language: Language) => {
        this.notify(() => {
            this.getState().learningLanguage = language;
            this.persist('SettingsStore.learningLanguage', language);
        });
    }

    public setLearnerLanguage = (language: Language) => {
        this.notify(() => {
            this.getState().learnerLanguage = language;
            this.persist('SettingsStore.learnerLanguage', language);
        });
    }

    public setAccessToken = (token: string) => {
        this.notify(() => {
            this.getState().accessToken = token;
            this.persist('SettingsStore.accessToken', token);
        });
    }
}
