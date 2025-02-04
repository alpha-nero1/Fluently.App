import { Language } from "~/lib/types/enums/Language";
import { Observable } from "../observable";
import { UiThemeType } from "~/lib/themes/themes";

export interface SettingState {
  learningLanguage: Language;
  learnerLanguage: Language;
  theme: UiThemeType;
}

export class SettingStore extends Observable<SettingState> {
    constructor() {
        super({ 
            learnerLanguage: Language.English, 
            learningLanguage: Language.Italian, 
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
