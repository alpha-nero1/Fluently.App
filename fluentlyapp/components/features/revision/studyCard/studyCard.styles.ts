import { StyleSheet } from "react-native";
import { IColours } from "~/lib/themes/colours";

export default (colours: IColours) => StyleSheet.create({
    content: {
        padding: 16,
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    feedbackSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    feedbackButton: {
        flex: 1,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: 6
    },
    fail: {
        color: colours.TextError,
        backgroundColor: colours.Red
    },
    hard: {
        color: colours.TextWarning,
        backgroundColor: colours.Orange
    },
    okay: {
        color: colours.TextInfo,
        backgroundColor: colours.BlueLight
    },
    easy: {
        color: colours.TextSuccess,
        backgroundColor: colours.Green
    }
});