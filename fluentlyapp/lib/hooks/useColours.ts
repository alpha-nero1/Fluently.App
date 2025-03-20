import { StyleSheet, useColorScheme } from "react-native";
import { getColours, IColours } from "../themes/colours";

/**
 *  Get the current colour set based on
 *  user theme settings. 
 */
export const useColours = () => {
    const theme = useColorScheme();

    return getColours(theme);
}

/**
 *  Get the current colour set based on
 *  user theme settings. 
 */
export const useColouredStyles = (styleFunc: (colours: IColours) => any) => {
    const theme = useColorScheme();

    return styleFunc(getColours(theme));
}