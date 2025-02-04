import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cardContainer: {
        perspective: '1000', // 3D effect
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        position: "absolute",
        backfaceVisibility: "hidden", // Hides the back when flipping
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    cardFace: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    backCard: {
        transform: [{ rotateY: "180deg" }],
        backgroundColor: "#eee",
    }
});