import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
        color: '#dc3545',
        backgroundColor: '#fab0b7',
    },
    hard: {
        color: '#ffc107',
        backgroundColor: '#f9e8b4',
    },
    okay: {
        color: '#113ef5',
        backgroundColor: '#9bafff',
    },
    easy: {
        color: '#28a745',
        backgroundColor: '#a1fcb6',
    },
});