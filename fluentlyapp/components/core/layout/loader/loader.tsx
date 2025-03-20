import React from 'react'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { useColouredStyles } from '~/lib/hooks/useColours';
import { IColours } from '~/lib/themes/colours';

const styleFunc = (colours: IColours) => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    message: {
      marginTop: 10,
      fontSize: 16,
      color: colours.Text,
    }
});

interface Props {
    message?: string;
    size?: number | 'small' | 'large';
}

export function Loader(props: Props) {
    const { size, message } = props;
    const msg = message || 'Loading...';
    const styles = useColouredStyles(styleFunc);

    return (
        <View style={styles.container}>
            <ActivityIndicator size={size || 'small'} />
            <Text style={styles.message}>{msg}</Text>
        </View>
    );
}
