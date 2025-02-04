import { Colours } from "./colours";

export type UiThemeType = 'Light' | 'Dark'

export interface UiTheme {
    backgroundColour: string;
    textColour: string;
    primaryColour: string;
}

export const Themes: { [key in UiThemeType]: UiTheme } = {
    Dark: {
        backgroundColour: Colours.Dark,
        textColour: Colours.Light,
        primaryColour: Colours.Blue
    },
    Light: {
        backgroundColour: Colours.Light,
        textColour: Colours.Dark,
        primaryColour: Colours.Blue
    }
}

export const Theme = (type: UiThemeType) => {
    return Themes[type];
}