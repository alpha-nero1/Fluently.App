import { StyleSheet } from 'react-native';
import { IColours } from '~/lib/themes/colours';

export const stylesFunc = (colours: IColours) => StyleSheet.create({
    item: {
      backgroundColor: colours.Background,
      padding: 8,
      width: '49%',
      margin: 4,
      borderRadius: 8,
      height: 300
    },
    header: {
      paddingLeft: 16
    }
});