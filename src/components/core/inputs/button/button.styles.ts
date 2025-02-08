import { StyleSheet } from "react-native";
import { IColours } from "~/lib/themes/colours";

export const styleFunc = (colours: IColours) => StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        fontFamily: 'Athelas-Regular'
    },
    loaderContainer: {
        padding: 6
    },
    disabledButton: {
        backgroundColor: colours.Grey,
    },
    disabledText: {
        color: colours.Background
    }
});
  
// Type Styles (matching your CSS)
export const typeStylesFunc = (colours: IColours) => StyleSheet.create({
    info: {
        backgroundColor: colours.Blue,
    },
    secondary: {
        backgroundColor: colours.BlueLight,
    },
    special: {
        backgroundColor: colours.Purple,
    },
    unknown: {
        backgroundColor: colours.Grey,
    },
    'text-info': {
        backgroundColor: 'transparent',
    }
});

export const textStylesFunc = (colours: IColours) => StyleSheet.create({
    info: {
        color: colours.White,
    },
    secondary: {
        color: colours.White,
    },
    special: {
        color: colours.White,
    },
    unknown: {
        color: colours.White,
    },
    'text-info': {
        color: colours.Blue
    }
});