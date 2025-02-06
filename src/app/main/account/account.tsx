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

import styles from './account.styles';

const LanguageItem = (language: Language) => {
    return (
        <View style={styles.languageItem}>
            <Txt type='title' disableStandardSpacing>{language}</Txt>
            <CountryFlag isoCode={LanguageIsoCodeMap[language]} size={25} />
        </View>
    )
}

export const Account = ({ navigation }: any) => {
    const { settingStore } = useStores();

    const logoutOnPress = () => {
        navigation.replace('Login');
    }

    return (
        <PageView>
            <Txt type='h1'>Account</Txt>
            <VerticalSpacer spacing={16} />
            <Txt type='title'>Language Settings</Txt>
            <Dropdown<Language>
                selected={settingStore.learnerLanguage}
                options={Languages}
                display={LanguageItem}
                label='I speak'
                placeholder='Select a language'
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
                label='I am learning'
                placeholder='Select a language'
                onSelect={(lang) => {
                    if (!lang) return;
                    settingStore.setLearningLanguage(lang);
                }}
            />
            <VerticalSpacer spacing={32} />
            <Button type='unknown' onPress={logoutOnPress}>Logout</Button>
        </PageView>
    )
}
