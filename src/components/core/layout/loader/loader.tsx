import React from 'react'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional background for better visibility
    },
    message: {
      marginTop: 10,
      fontSize: 16,
      color: '#333',
    }
});

interface Props {
    message?: string;
    size?: number | 'small' | 'large';
}

export function Loader(props: Props) {
    const { size, message } = props;
    const msg = message || 'Loading...';

    return (
        <View style={styles.container}>
            <ActivityIndicator size={size || 'small'} />
            <Text style={styles.message}>{msg}</Text>
        </View>
    );
}
