import { StyleSheet } from 'react-native';
import { IColours } from '~/lib/themes/colours';

export default (colours: IColours) => StyleSheet.create({
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
        paddingLeft: 2,
        paddingRight: 2,
        borderRadius: 4,
        color: colours.Text,
        fontSize: 26,
        fontFamily: 'Athelas-Regular'
    },
    spansegmentAvailable: {
        borderBottomWidth: 2,
        borderBottomColor: '#DDD'
    },
    spansegmentSaved: {
        borderBottomWidth: 2,
        borderBottomColor: colours.Green
    },
    spansegmentLoading: {
        backgroundColor: '#DDD'
    },
    spansegmentSelected: {
        backgroundColor: 'rgb(31, 71, 233)',
        color: 'white',
        borderBottomWidth: 0
    },
    line: {
        paddingBottom: 8,
        wordWrap: 'break-word',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});