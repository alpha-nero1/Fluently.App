import React from 'react'
import { PageView } from '~/components/core/layout/pageView/pageView'
import { Txt } from '~/components/core/layout/txt/Txt'
import { IRegisterData, RegisterWorkflow } from '~/components/registerWorkflow/registerWorkflow'
import Toast from 'react-native-toast-message';
import { useI18 } from '~/lib/hooks/useI18';
import { cognitoApi } from '~/api/cognitoApi';
import { useStores } from '~/lib/state/storeProvider';
import { usersApi } from '~/api/usersApi';
import { AppUser } from '~/api/types/appUser';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '~/lib/types/enums/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { showToast } from '~/lib/utils/toastUtils';

export type StackParamList = {
    Main: undefined;
};

export default function RegisterScreen() {
    const i18 = useI18();
    const { settingStore } = useStores();
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const onSubmit = (data: IRegisterData) => {
        const username = data.email ? data.email : data.phone ?? '';
        // Now that it has succeeded, let's auto log the user in!
        cognitoApi.signIn(username, data.password)
        .then(bearer => {
            settingStore.setAccessToken(bearer);
            usersApi.sync(new AppUser({
                email: data.email,
                phone: data.phone,
                learnerLanguage: data.learnerLanguage,
                learningLanguage: data.learningLanguage
            }), bearer);
            navigation.replace(Screens.Main);
            showToast('success', [i18.Sign_up_successful, i18.Happy_learning_exc]);
        });
    }

    return (
        <PageView disableDefaultPadding>
            <Txt type='h1' style={{ paddingLeft: 16 }}>Sign up</Txt>
            <RegisterWorkflow onSubmit={onSubmit}/>
        </PageView>
    )
}
