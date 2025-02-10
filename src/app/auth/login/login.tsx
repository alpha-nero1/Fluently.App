import React, { useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
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
import { cognitoApi } from '~/api/cognitoApi';
import { useStores } from '~/lib/state/storeProvider';
import Toast from 'react-native-toast-message';
import { UsersApi } from '~/api/usersApi';
import { AppUser } from '~/api/types/appUser';

import stylesFunc from './loginScreen.styles';

export default function LoginScreen() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState('');
    const styles = useColouredStyles(stylesFunc);
    const i18 = useI18();
    const { settingStore } = useStores();

    const loginOnPress = () => {
        cognitoApi.signIn(username, password)
        .then(bearer => {
            console.log('aa got res!', bearer);
            settingStore.setAccessToken(bearer);
            const appUser = new AppUser({
                learnerLanguage: settingStore.learnerLanguage,
                learningLanguage: settingStore.learningLanguage
            });
            if (username.includes('@')) appUser.email = username;
            else appUser.phone = username;

            UsersApi.sync(appUser, bearer);
            router.replace('/main/explore');
        })
        .catch(err => {
            console.error(err);
            Toast.show({
                type: 'error',
                text1: i18.Login_failed,
                text2: i18.Please_try_again,
                visibilityTime: 5000,
                text1Style: { fontSize: 18, fontWeight: 'normal', fontFamily: 'Athelas-Regular' },
                text2Style: { fontSize: 14, fontWeight: 'normal', fontFamily: 'Athelas-Regular' }
            });

            // NOTE: DELETE BEFORE PUBLISH
            router.replace('/main/explore');
        })
    }

    const signupOnPress = () => {
        router.push('/auth/register/registerScreen');
    }

    return (
        <PageView style={styles.page} disableDefaultPadding applyOffsetBottomPadding>
            <KeyboardAvoidingView>
                <View style={styles.widget}>
                    <Txt type='h1'>{i18.Fluently}</Txt>
                    <VerticalSpacer spacing={16} />
                    <TextField value={username} placeholder={i18.Username} autoCapitalize={'none'} onChangeText={setUsername} />
                    <VerticalSpacer spacing={16} />
                    <TextField value={password} placeholder={i18.Password} autoCapitalize={'none'} secureTextEntry onChangeText={setPassword}  />
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
