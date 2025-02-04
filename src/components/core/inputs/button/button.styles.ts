import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    loaderContainer: {
        padding: 6
    },
    disabledButton: {
        backgroundColor: "gray",
    },
    disabledText: {
        color: "#ddd",
    }
});
  
// Type Styles (matching your CSS)
export const typeStyles = StyleSheet.create({
    info: {
        backgroundColor: "rgb(31, 71, 233)",
    },
    special: {
        backgroundColor: "#5408ed",
    },
    unknown: {
        backgroundColor: "#999",
    }
});