import React from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
import { Txt } from '~/components/core/layout/txt/Txt';
import { Button } from '~/components/core/inputs/button/button';
import { FloatingTextView } from '~/components/floatingTextView/floatingTextView';
import { fluentlyInDifferentLanguages } from '~/lib/constants/language';
import { TextField } from '~/components/core/inputs/textField/textField';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { router } from 'expo-router';
import { useColouredStyles } from '~/lib/hooks/useColours';
import { useI18 } from '~/lib/hooks/useI18';

import stylesFunc from './loginScreen.styles';

export default function LoginScreen() {
    const styles = useColouredStyles(stylesFunc);
    const i18 = useI18();

    const loginOnPress = () => {
        router.replace('/main/explore');
    }

    const signupOnPress = () => {
        router.push('/auth/register/registerScreen');
    }

    return (
        <PageView style={styles.page} disableDefaultPadding applyOffsetBottomPadding>
            <KeyboardAvoidingView>
                <View style={styles.widget}>
                    <Txt type='h1' italic>{i18.Fluently}</Txt>
                    <VerticalSpacer spacing={16} />
                    <TextField placeholder={i18.Username} autoCapitalize={'none'} />
                    <VerticalSpacer spacing={16} />
                    <TextField placeholder={i18.Password} autoCapitalize={'none'} secureTextEntry />
                    <VerticalSpacer spacing={32} />
                    <Button onPress={loginOnPress}>{i18.Login}</Button>
                    <VerticalSpacer spacing={16} />
                    <Button onPress={signupOnPress} type='text-info'>{i18.Sign_up}</Button>
                </View>
            </KeyboardAvoidingView>
            <FloatingTextView words={fluentlyInDifferentLanguages} />
        </PageView>
    );
}
