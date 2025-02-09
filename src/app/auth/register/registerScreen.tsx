import React from 'react'
import { PageView } from '~/components/core/layout/pageView/pageView'
import { Txt } from '~/components/core/layout/txt/Txt'
import { IRegisterData, RegisterWorkflow } from '~/components/registerWorkflow/registerWorkflow'
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useI18 } from '~/lib/hooks/useI18';

export default function RegisterScreen() {
    const i18 = useI18();

    const onSubmit = (data: IRegisterData) => {
        // Do api shiz here!
        router.replace('/main/explore');
        Toast.show({
            type: 'success',
            text1: i18.Sign_up_successful,
            text2: i18.Happy_learning_exc,
            visibilityTime: 2000,
            text1Style: { fontSize: 18, fontWeight: 'normal', fontFamily: 'Athelas-Regular' },
            text2Style: { fontSize: 14, fontWeight: 'normal', fontFamily: 'Athelas-Regular' }
        });
    }

    return (
        <PageView disableDefaultPadding>
            <Txt type='h1' style={{ paddingLeft: 16 }}>Sign up</Txt>
            <RegisterWorkflow onSubmit={onSubmit}/>
        </PageView>
    )
}
