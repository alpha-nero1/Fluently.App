import { useColorScheme } from "react-native";
import { getColours, IColours } from "../themes/colours";

/**
 *  Render your styles factoring in the themed colours.
 */
export const useColouredStyles = <TStylesheet> (styleFunc: (colours: IColours) => TStylesheet) => {
    const theme = useColorScheme();

    return styleFunc(getColours(theme));
}