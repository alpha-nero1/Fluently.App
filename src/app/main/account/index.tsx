import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Dropdown } from '~/components/core/inputs/dropdown/dropdown';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { Txt } from '~/components/core/layout/txt/Txt';
import { LanguageIsoCodeMap, LearnerLanguages, LearningLanguages } from '~/lib/constants/language';
import { Language } from '~/lib/types/enums/Language';
import CountryFlag from "react-native-country-flag";
import { useStores } from '~/lib/state/storeProvider';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { Button } from '~/components/core/inputs/button/button';
import { router } from 'expo-router';
import { useI18 } from '~/lib/hooks/useI18';
import { TextField } from '~/components/core/inputs/textField/textField';
import { BottomSheetType } from '~/lib/state/stores/bottomSheetStore';

import { styles } from './account.styles';
import { UsersApi } from '~/api/usersApi';
import { Feedback } from '~/api/types/feedback';
import { useAppLogger } from '~/lib/logging/AppLogger';

export const LanguageItem = (language: Language) => {
    return (
        <View style={styles.languageItem}>
            <Txt type='title' disableStandardSpacing>{language}</Txt>
            <CountryFlag isoCode={LanguageIsoCodeMap[language]} size={25} />
        </View>
    )
}

export default () => {
    const { settingStore, bottomSheetStore } = useStores();
    const [feedback, setFeedback] = useState('');
    const [feedbackSaved, setFeedbackSaved] = useState(false);
    const i18 = useI18();
    const logger = useAppLogger();

    const logoutOnPress = () => {
        router.replace('/auth/login/login');
    }

    const submitFeedbackOnPress = () => {
        UsersApi.saveFeedback(new Feedback({
            text: feedback
        }), settingStore.accessToken)
        .then(res => {
            setFeedback('');
            setFeedbackSaved(true);
            logger.info('Feedbac saved!')
        })
        .catch((err) => {
            logger.error('Save feedback error: ', err)
        })
        
    }

    const manageSubscriptionOnPress = () => {
        bottomSheetStore.setMessage({
            type: BottomSheetType.ManageSubscription,
            data: {},
            onClose: () => {}
        });
    }

    return (
        <PageView>
            <ScrollView>
                <Txt type='h1'>{i18.Account}</Txt>
                <VerticalSpacer spacing={16} />
                <Txt type='title'>{i18.Language_Settings}</Txt>
                <Dropdown<Language>
                    selected={settingStore.learnerLanguage}
                    options={LearnerLanguages}
                    display={LanguageItem}
                    label={i18.I_speak}
                    placeholder={i18.Select_a_langauge}
                    onSelect={(lang) => {
                        if (!lang) return;
                        settingStore.setLearnerLanguage(lang);
                    }}
                />
                <VerticalSpacer spacing={16} />
                <Dropdown<Language>
                    selected={settingStore.learningLanguage}
                    options={LearningLanguages}
                    display={LanguageItem}
                    label={i18.I_am_learning}
                    placeholder={i18.Select_a_langauge}
                    onSelect={(lang) => {
                        if (!lang) return;
                        settingStore.setLearningLanguage(lang);
                    }}
                />
                <VerticalSpacer spacing={32} />
                {
                    !feedbackSaved 
                    ? (
                        <>
                            <Txt type='title'>{i18.Feedback_Suggestions}</Txt>
                            <TextField 
                                value={feedback}
                                placeholder={i18.Let_us_know_your_thoughts}
                                multiline
                                style={{ minHeight: 100 }}
                                onChangeText={(text) => setFeedback(text)}
                            />
                            <Button type='info' onPress={submitFeedbackOnPress}>{i18.Submit}</Button>
                            <VerticalSpacer spacing={32} />
                        </>
                    ) : (<>
                        <Txt type='normal'>{i18.Thanks_for_your_valuable_feedback}</Txt>
                        <Button type='text-info' onPress={() => setFeedbackSaved(false)}>{i18.Send_another}</Button>
                        <VerticalSpacer spacing={32} />
                    </>)
                }
                <Txt type='title'>{i18.Subscription}</Txt>
                <Button type='info' onPress={manageSubscriptionOnPress}>{i18.Manage_subscription}</Button>
                <VerticalSpacer spacing={32} />
                <Button type='text-info' onPress={logoutOnPress}>{i18.Logout}</Button>
            </ScrollView>
        </PageView>
    )
}
