import React from 'react';
import { Dimensions, View } from 'react-native';
import { Dropdown } from '~/components/core/inputs/dropdown/dropdown';
import { PageView } from '~/components/core/layout/pageView/pageView';
import { Txt } from '~/components/core/layout/txt/Txt';
import { LanguageIsoCodeMap, Languages } from '~/lib/constants/language';
import { Language } from '~/lib/types/enums/Language';
import CountryFlag from "react-native-country-flag";
import { useStores } from '~/lib/state/storeProvider';
import { VerticalSpacer } from '~/components/core/layout/verticalSpacer/verticalSpacer';
import { Button } from '~/components/core/inputs/button/button';
import { router } from 'expo-router';
import { useI18 } from '~/lib/hooks/useI18';

import { styles } from './account.styles';

const LanguageItem = (language: Language) => {
    return (
        <View style={styles.languageItem}>
            <Txt type='title' disableStandardSpacing>{language}</Txt>
            <CountryFlag isoCode={LanguageIsoCodeMap[language]} size={25} />
        </View>
    )
}

export default () => {
    const { settingStore } = useStores();
    const i18 = useI18();

    const logoutOnPress = () => {
        router.replace('/auth/login/login');
    }

    return (
        <PageView>
            <Txt type='h1'>{i18.Account}</Txt>
            <VerticalSpacer spacing={16} />
            <Txt type='title'>{i18.Language_Settings}</Txt>
            <Dropdown<Language>
                selected={settingStore.learnerLanguage}
                options={Languages}
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
                options={Languages}
                display={LanguageItem}
                label={i18.I_am_learning}
                placeholder={i18.Select_a_langauge}
                onSelect={(lang) => {
                    if (!lang) return;
                    settingStore.setLearningLanguage(lang);
                }}
            />
            <VerticalSpacer spacing={32} />
            <Button type='unknown' onPress={logoutOnPress}>{i18.Logout}</Button>
        </PageView>
    )
}
