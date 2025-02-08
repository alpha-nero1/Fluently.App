import { Language } from "~/lib/types/enums/Language";
import { Observable } from "../observable";
import { UiThemeType } from "~/lib/themes/themes";
import * as Localization from 'expo-localization';
import { languageCodeToLanguage } from "~/lib/hooks/useI18";

export interface SettingState {
  learningLanguage: Language;
  learnerLanguage: Language;
  theme: UiThemeType;
}

const languageCode = Localization.getLocales()[0].languageCode || 'en';
const defaultLearnerLanguage = languageCodeToLanguage[languageCode];
const defaultLearningLanguage = (
    defaultLearnerLanguage === Language.English
    ? Language.Italian
    : Language.English
)

export class SettingStore extends Observable<SettingState> {
    constructor() {
        super({ 
            learnerLanguage: defaultLearnerLanguage, 
            learningLanguage: defaultLearningLanguage, 
            theme: 'Light'
        });
    }

    public get learnerLanguage() {
        return this.getState().learnerLanguage;
    }

    public get learningLanguage() {
        return this.getState().learningLanguage;
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
        this.load('SettingsStore.theme')
            .then(theme => {
                if (theme) this.setTheme(theme as UiThemeType);
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

    public setTheme = (theme: UiThemeType) => {
        this.notify(() => {
            this.getState().theme = theme;
            this.persist('SettingsStore.theme', theme);
        });
    }
}
