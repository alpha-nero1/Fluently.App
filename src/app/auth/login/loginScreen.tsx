import React from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
import { Txt } from '~/components/core/layout/txt/Txt';
import { Button } from '~/components/core/inputs/button/button';
import { FloatingTextView } from '~/components/floatingTextView/floatingTextView';
import { fluentlyInDifferentLanguages } from '~/lib/constants/language';
import { TextField } from '~/components/core/inputs/textField/textField';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { PageView } from '~/components/core/layout/pageView/pageView';

import styles from './loginScreen.styles';

export function LoginScreen({ navigation }: any) {
    const loginOnPress = () => {
        navigation.replace('MainApp');
    }

    return (
        <PageView style={styles.page} disableDefaultPadding>
            <KeyboardAvoidingView>
                <View style={styles.widget}>
                    <Txt type='h1' italic>Fluently</Txt>
                    <VerticalSpacer spacing={16} />
                    <TextField placeholder='Username' autoCapitalize={'none'} />
                    <VerticalSpacer spacing={16} />
                    <TextField placeholder='Password' autoCapitalize={'none'} secureTextEntry />
                    <VerticalSpacer spacing={32} />
                    <Button onPress={loginOnPress}>Login</Button>
                </View>
            </KeyboardAvoidingView>
            <FloatingTextView words={fluentlyInDifferentLanguages} />
        </PageView>
    );
}
