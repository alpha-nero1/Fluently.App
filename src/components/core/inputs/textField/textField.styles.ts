import { StyleSheet } from "react-native"
import { IColours } from "~/lib/themes/colours";

export default (colours: IColours) => StyleSheet.create({
    field: {
        borderWidth: 1,
        borderColor: colours.GreyLight,
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        fontFamily: 'Athelas-Regular',
        fontSize: 20,
        color: colours.Text,
        flex: 1
    },
    error: {
        borderWidth: 1,
        borderColor: colours.Red,
    },
    valid: {
        borderWidth: 1,
        borderColor: colours.Green,
    },
    captionError: {
        color: colours.Red
    },
    captionValid: {
        color: colours.Green
    }
});