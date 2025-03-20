import { StyleSheet } from 'react-native';
import { IColours } from '~/lib/themes/colours';

export default (colours: IColours) => StyleSheet.create({
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
        backgroundColor: colours.Background,
        borderWidth: 1,
        borderColor: colours.Grey,
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
