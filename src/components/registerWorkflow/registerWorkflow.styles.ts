import { Dimensions, StyleSheet } from "react-native";
import { IColours } from "~/lib/themes/colours";

const { width } = Dimensions.get('screen');

export default (colours: IColours) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: width * 3, // Enough space for three steps to sit side by side
    },
    stage: {
        width,
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    stageForm: {
        width: '100%',
        height: 300,
        padding: 20,
        marginBottom: 60
    }
});