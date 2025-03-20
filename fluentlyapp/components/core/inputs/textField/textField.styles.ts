import { StyleSheet } from "react-native"
import { IColours } from "~/lib/themes/colours";

export default (colours: IColours) => StyleSheet.create({
    field: {
        borderBottomWidth: 2,
        borderColor: colours.GreyLight,
        padding: 8,
        marginBottom: 8,
        fontFamily: 'Athelas-Regular',
        fontSize: 20,
        color: colours.Text,
        flex: 1
    },
    focused: {
        borderColor: colours.BlueLight,
    },
    error: {
        borderColor: colours.Red,
    },
    valid: {
        borderColor: colours.Green,
    },
    captionError: {
        color: colours.Red
    },
    captionValid: {
        color: colours.Green
    }
});