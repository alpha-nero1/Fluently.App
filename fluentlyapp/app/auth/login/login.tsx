import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { Txt } from '~/components/core/layout/txt/Txt';
import { Button } from '~/components/core/inputs/button/button';
import { FloatingTextView } from '~/components/floatingTextView/floatingTextView';
import { fluentlyInDifferentLanguages } from '~/lib/constants/language';
import { TextField } from '~/components/core/inputs/textField/textField';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { useColouredStyles } from '~/lib/hooks/useColours';
import { useI18 } from '~/lib/hooks/useI18';
import { cognitoApi } from '~/api/cognitoApi';
import { useStores } from '~/lib/state/storeProvider';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '~/lib/types/enums/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppLogger } from '~/lib/logging/AppLogger';
import { showToast } from '~/lib/utils/toastUtils';

import stylesFunc from './loginScreen.styles';

type StackParamList = {
    Main: undefined;
    SignUp: undefined;
};

export default function LoginScreen() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const styles = useColouredStyles(stylesFunc);
    const i18 = useI18();
    const { settingStore } = useStores();
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const logger = useAppLogger();

    const loginOnPress = () => {
        setLoginLoading(true);
        cognitoApi.signIn(username, password)
            .then(bearer => {
                setLoginLoading(false);
                settingStore.setAccessToken(bearer);
                navigation.replace(Screens.Main);
            })
            .catch(err => {
                logger.error('Sign in failure', err);
                setLoginLoading(false);
                showToast('error', [i18.Login_failed, i18.Please_try_again]);
            });
    }

    const signupOnPress = () => {
        navigation.navigate(Screens.SignUp);
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
                    <Button 
                        onPress={loginOnPress}
                        isLoading={loginLoading}
                    >
                        {i18.Login}
                    </Button>
                    <VerticalSpacer spacing={16} />
                    <Button onPress={signupOnPress} type='text-info'>{i18.Sign_up}</Button>
                </View>
            </KeyboardAvoidingView>
            <FloatingTextView words={fluentlyInDifferentLanguages} />
        </PageView>
    );
}
