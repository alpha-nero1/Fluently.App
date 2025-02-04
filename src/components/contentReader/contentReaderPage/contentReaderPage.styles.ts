import { StyleSheet } from 'react-native';
import { Colours } from '~/lib/themes/colours';

export default StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    },
    spansegment: {
        wordWrap: 'break-word',
        marginRight: 2,
        marginLeft: 2,
        marginTop: 4,
        marginBottom: 4,
        padding: 2,
        borderRadius: 4,
        color: Colours.Dark,
        fontSize: 26,
        fontFamily: 'Athelas-Regular'
    },
    spansegmentAvailable: {
        borderBottomWidth: 4,
        borderBottomColor: '#DDD'
    },
    spansegmentLoading: {
        backgroundColor: '#DDD'
    },
    spansegmentSelected: {
        backgroundColor: 'rgb(31, 71, 233)',
        color: 'white',
        transform: 'scale(1.1)',
        borderBottomWidth: 0
    },
    paragraph: {
        paddingBottom: 16,
        wordWrap: 'break-word',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});