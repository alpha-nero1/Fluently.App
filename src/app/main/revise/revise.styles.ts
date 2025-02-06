import { StyleSheet } from 'react-native';
import { Colours } from '~/lib/themes/colours';

export default StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    setOverview: {
        marginTop: 16,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    gradeOverview: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    setCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    setCardOutline: {
        borderColor: Colours.GreyLight,
        borderWidth: 1,
        borderRadius: 8, // Equivalent to 0.4rem
        padding: 8, // Equivalent to 1rem
        flexDirection: 'row',
        width: '49%',
        marginBottom: 8
    },
    setCardOutlineLeft: {
        flex: 1
    },
    setCardOutlineRight: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // Keep flexDirection for row alignment if necessary
    },
    footerButton: {  
        position: 'absolute', 
        bottom: 8, 
        zIndex: 100, 
        left: 8, 
        right: 8 
    }
});