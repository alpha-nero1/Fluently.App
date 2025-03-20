export interface IColours {
    Text: string;
    // Lozenge text colours.
    TextSuccess: string;
    TextWarning: string;
    TextSpecial: string;
    TextError: string;
    TextInfo: string;
    TextUnknown: string;
    // Background
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
    TextSuccess: '#1D2125',
    TextWarning: '#1D2125',
    TextSpecial: '#1D2125',
    TextError: '#1D2125',
    TextInfo: '#1D2125',
    TextUnknown: '#1D2125',
    // Background colour
    Background: '#333',
    BackgroundDeep: '#000',
    Blue: '#007bff',
    BlueLight: '#579DFF',
    Green: '#4BCE97',
    GreenLight: '#ADEFB1',
    Purple: '#9F8FEF',
    PurpleLight: '#E0B0FF',
    Red: '#F87168',
    RedLight: '#fab0b7',
    Orange: '#F5CD47',
    OrangeLight: '#f9e8b4',
    Grey: 'grey',
    GreyLight: 'lightgrey',
    White: '#F5F5F5'
}

const LightThemeColours: IColours = {
    // Text colour.
    Text: '#1D2125',
    TextSuccess: '#1D2125',
    TextWarning: '#1D2125',
    TextSpecial: '#1D2125',
    TextError: '#1D2125',
    TextInfo: '#1D2125',
    TextUnknown: '#1D2125',
    // Background colour
    Background: '#F5F5F5',
    BackgroundDeep: '#FFF',
    Blue: '#007bff',
    BlueLight: '#579DFF',
    Green: '#4BCE97',
    GreenLight: '#ADEFB1',
    Purple: '#9F8FEF',
    PurpleLight: '#E0B0FF',
    Red: '#F87168',
    RedLight: '#fab0b7',
    Orange: '#F5CD47',
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
