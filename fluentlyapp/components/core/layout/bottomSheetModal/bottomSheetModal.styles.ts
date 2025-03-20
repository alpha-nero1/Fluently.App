import { StyleSheet } from 'react-native';
import { IColours } from '~/lib/themes/colours';

export default (colours: IColours) => StyleSheet.create({
    sheetView: {
        flex: 1,
        padding: 16,
        zIndex: 9999999,
        backgroundColor: colours.Background
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 999,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%'
    },
    bottomSheet: {
        zIndex: 99999,
        backgroundColor: colours.Background,
        borderRadius: 16
    },
    sheetBackground: {
        backgroundColor: colours.Background,
    },
    handle: {
        backgroundColor: colours.Background,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderWidth: 0
    },
    indicator: {
        backgroundColor: colours.Grey
    }
});