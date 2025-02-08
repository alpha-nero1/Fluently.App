export interface IColours {
    Text: string;
    Background: string;
    BackgroundDeep: string;
    Blue: string;
    BlueLight: string;
    Green: string;
    GreenLight: string;
    Purple: string;
    PurpleLight: string;
    Red: string;
    RedLight: string;
    Orange: string;
    OrangeLight: string;
    Grey: string;
    GreyLight: string;
    White: string;
}

const DarkThemeColours: IColours = {
    // Text colour.
    Text: '#F5F5F5',
    // Background colour
    Background: '#333',
    BackgroundDeep: '#000',
    Blue: '#007bff',
    BlueLight: '#70d6ff',
    Green: '#34c759',
    GreenLight: '#ADEFB1',
    Purple: '#5856d6',
    PurpleLight: '#E0B0FF',
    Red: '#dc3545',
    RedLight: '#fab0b7',
    Orange: '#ff9500',
    OrangeLight: '#f9e8b4',
    Grey: 'grey',
    GreyLight: 'lightgrey',
    White: '#F5F5F5'
}

const LightThemeColours: IColours = {
    // Text colour.
    Text: '#333',
    // Background colour
    Background: '#F5F5F5',
    BackgroundDeep: '#FFF',
    Blue: '#007bff',
    BlueLight: '#70d6ff',
    Green: '#34c759',
    GreenLight: '#ADEFB1',
    Purple: '#5856d6',
    PurpleLight: '#E0B0FF',
    Red: '#dc3545',
    RedLight: '#fab0b7',
    Orange: '#ff9500',
    OrangeLight: '#f9e8b4',
    Grey: 'grey',
    GreyLight: 'lightgrey',
    White: '#F5F5F5'
}

/**
 * Get colours to use in the app, allows us to apply theming.
 */
export const getColours = (theme: 'light' | 'dark' | null | undefined = 'light'): IColours => {
    if (theme === 'dark') {
        return DarkThemeColours;
    }

    return LightThemeColours;
}
