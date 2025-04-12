import { useColorScheme } from "react-native";
import { getColours } from "../themes/colours";

/**
 *  Get the current colour set based on user theme settings. 
 */
export const useColours = () => {
    const theme = useColorScheme();

    return getColours(theme);
}
