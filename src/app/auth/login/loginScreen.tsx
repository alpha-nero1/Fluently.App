import React from 'react'
import { View, Button, TextInput } from 'react-native'
import { Txt } from '~/components/core/layout/txt/Txt';

import styles from './loginScreen.styles';

export function LoginScreen({ navigation }: any) {
    const loginOnPress = () => {
        navigation.replace('MainApp');
    }

    return (
        <View style={styles.page}>
            <View style={styles.widget}>
                <Txt type='h1' italic>Fluently</Txt>
                <TextInput placeholder='Username' />
                <TextInput placeholder='Password' />
                <Button onPress={loginOnPress} title='Login' />
            </View>
        </View>
    );
}
