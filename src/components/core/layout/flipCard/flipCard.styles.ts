import { StyleSheet } from 'react-native';
import { IColours } from '~/lib/themes/colours';

export default (colours: IColours) => StyleSheet.create({
    cardContainer: {
        perspective: '1000', // 3D effect
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        position: "absolute",
        backfaceVisibility: "hidden", // Hides the back when flipping
        top: 20,
        bottom: 140,
        left: 16,
        right: 16
    },
    cardFace: {
        flex: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colours.Background,
    },
    backCard: {
        transform: [{ rotateY: "180deg" }],
        backgroundColor: colours.Background,
    }
});