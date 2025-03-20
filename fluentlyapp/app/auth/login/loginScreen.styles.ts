import { StyleSheet } from 'react-native';
import { IColours } from '~/lib/themes/colours';

export default (colours: IColours) => StyleSheet.create({
    page: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    widget: {
        width: '70%',
        minWidth: 300,
        padding: 32,
        borderRadius: 8,
        zIndex: 100,
        backgroundColor: colours.Background
    }
});