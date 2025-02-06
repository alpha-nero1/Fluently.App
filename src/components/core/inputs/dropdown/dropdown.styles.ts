import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    dropdown: {
        position: "relative",
    },
    dropdownToggle: {
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        height: 50
    },
    placeholderView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        flex: 1,
        padding: 8
    }
});
