import React, { useState } from 'react';
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useI18 } from '~/lib/hooks/useI18';
import { Language } from '~/lib/types/enums/Language';
import { TextField } from '../core/inputs/textField/textField';
import { Txt } from '../core/layout/txt/Txt';
import { Button } from '../core/inputs/button/button';
import { Dropdown } from '../core/inputs/dropdown/dropdown';
import { DialingCodeToISO, LearnerLanguages, LearningLanguages } from '~/lib/constants/language';
import { LanguageItem } from '~/app/main/account';
import { VerticalSpacer } from '../core/layout/verticalSpacer/verticalSpacer';
import { getDefaultLearnerLanguage, getDefaultLearningLanguage } from '~/lib/utils/languageUtils';
import { Flex } from '../core/layout/flex/flex';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import styleFunc from './registerWorkflow.styles';
import { useColouredStyles } from '~/lib/hooks/useColours';
import { cognitoApi } from '~/api/cognitoApi';
import Toast from 'react-native-toast-message';
import CountryFlag from 'react-native-country-flag';

const { width } = Dimensions.get('screen');

export interface IRegisterData {
    email?: string
    phone?: string
    password: string;
    learningLanguage: Language;
    learnerLanguage: Language;
}

interface IRegisterWorkflowProps {
    onSubmit: (data: IRegisterData) => void;
}

const mobileRegex = /^\+?[1-9]\d{6,14}$/;
const dialCodeRegex = /^\+([1-9]\d{0,3})/;

const Stage = ({ index, formData, handleChange }: any) => {
    const styles = useColouredStyles(styleFunc);
    const i18 = useI18();
    const [resendIsLoading, setResendIsLoading] = useState(false);

    const resendCodeOnPress = async () => {
        const { email, phone } = formData;
        setResendIsLoading(true);
        const success = await cognitoApi.resendConfirmationCode(email || phone);
        setResendIsLoading(false);
        if (!success) {
            Toast.show({
                type: 'error',
                text1: i18.Sending_verification_code_failed,
                visibilityTime: 5000,
                text1Style: { fontSize: 18, fontWeight: 'normal', fontFamily: 'Athelas-Regular' }
            });
        }
    }

    const extractDialCode = (text: string = '') => {
        const match = text.match(dialCodeRegex);
        return match ? `+${match[1]}` : '';
    }

    const validatePhoneNumber = (text?: string) => {
        if (!text) return 'Required';
        if (!mobileRegex.test(text)) return 'Invalid format';
        if (!DialingCodeToISO.has(extractDialCode(text))) return 'Invalid country code';
        return null;
    }

    const stages = [
        <TouchableWithoutFeedback>
            <View key="email" style={styles.stageForm}>
                <Txt type='title'>{i18.Enter_your_email}</Txt>
                <TextField value={formData.email} onChangeText={value => handleChange('email', value)} placeholder={i18.Email} autoCapitalize='none' />
                <Txt type='subtitle'>{i18.OR}</Txt>
                <Txt type='title'>{i18.Phone_number}</Txt>
                <TextField
                    value={formData.phone} 
                    onChangeText={value => handleChange('phone', value)} 
                    placeholder={i18.Phone_number_include_country_code} 
                    keyboardType='phone-pad'
                    validation={validatePhoneNumber}
                    prefix={(text) => {
                        if (!text || !DialingCodeToISO.has(extractDialCode(text))) return (
                            <CountryFlag isoCode={'ZZ'} size={25} />
                        );
                        return (
                            <CountryFlag isoCode={DialingCodeToISO.get(extractDialCode(text)) || 'ZZ'} size={25} />
                        );
                    }}
                />
            </View>
        </TouchableWithoutFeedback>,
        <TouchableWithoutFeedback>
            <View key="password" style={styles.stageForm}>
                <Txt type='title'>{i18.Enter_your_password}</Txt>
                <TextField value={formData.password} onChangeText={value => handleChange('password', value)} placeholder={i18.Password} secureTextEntry />
            </View>
        </TouchableWithoutFeedback>,
        <TouchableWithoutFeedback>
            <View key="verificationCode" style={styles.stageForm}>
                <Txt type='title'>{i18.render(i18.Confirm_the_code_sent_to_0, formData.email || formData.phone)}</Txt>
                <TextField value={formData.verificationCode} onChangeText={value => handleChange('verificationCode', value)} placeholder={i18.Verification_code} />
                <Button type='text-info' onPress={resendCodeOnPress} isLoading={resendIsLoading}>{i18.Resend_code}</Button>
            </View>
        </TouchableWithoutFeedback>,
        <TouchableWithoutFeedback>
            <View key="languages" style={styles.stageForm}>
                <Txt type='title'>{i18.You_speak}</Txt>
                <Dropdown<Language> selected={formData.learnerLanguage} options={LearnerLanguages} display={LanguageItem} placeholder={i18.Select_a_langauge} onSelect={(lang) => lang && handleChange('learnerLanguage', lang)} />
                <VerticalSpacer spacing={16} />
                <Txt type='title'>{i18.You_are_learning}</Txt>
                <Dropdown<Language> selected={formData.learningLanguage} options={LearningLanguages} display={LanguageItem} placeholder={i18.Select_a_langauge} onSelect={(lang) => lang && handleChange('learningLanguage', lang)} />
            </View>
        </TouchableWithoutFeedback>
    ]

    return stages[index];
}

export const RegisterWorkflow = ({ onSubmit }: IRegisterWorkflowProps) => {
    const [submitButtonIsLoading, setSubmitButtonIsLoading] = useState(false);
    const styles = useColouredStyles(styleFunc);
    const [currentStage, setCurrentStage] = useState(0);
    const i18 = useI18();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        learningLanguage: getDefaultLearningLanguage(),
        learnerLanguage: getDefaultLearnerLanguage()
    });

    const stages = [
        { label: 'Username' },
        { label: 'Password' },
        { label: 'Verification' },
        { label: 'Language' }
    ];

    // Shared value for translation
    const translateX = useSharedValue(0);

    const handleNext = () => {
        if (currentStage < stages.length - 1) {
            setCurrentStage(currentStage + 1);
        }
    };

    const handleBack = () => {
        if (currentStage > 0) {
            setCurrentStage(currentStage - 1);
        }
    };

    const handleSubmit = () => onSubmit(formData);

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const onGestureEvent = useAnimatedGestureHandler({
        onActive: (event) => translateX.value = event.translationX,
        onEnd: (event) => {
            if (event.translationX > 100 && currentStage > 0) {
                setCurrentStage(currentStage - 1); // Go back on swipe right
            } else if (event.translationX < -100 && currentStage < stages.length - 1) {
                setCurrentStage(currentStage + 1); // Go forward on swipe left
            }
            translateX.value = 0; // Reset translateX after gesture ends
        },
    });

    // Apply snapping with useAnimatedStyle
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(
                        currentStage * -width,
                        {
                            damping: 18,     // Smooth deceleration with moderate bounce
                            stiffness: 350,  // Strong but quick transition (similar to paging)
                            overshootClamping: true,
                            mass: 1,         // Standard mass
                        }
                    )
                }
            ]
        };
    });

    const handleVerify = async () => {
        const { username, verificationCode } = formData;
        setSubmitButtonIsLoading(true);
        const success = await cognitoApi.confirmSignUp(username, verificationCode);
        setSubmitButtonIsLoading(false);
        if (success) {
            Toast.show({
                type: 'success',
                text1: i18.Account_verified_exc,
                visibilityTime: 5000,
                text1Style: { fontSize: 18, fontWeight: 'normal', fontFamily: 'Athelas-Regular' },
            });
            return handleNext();
        }
        Toast.show({
            type: 'error',
            text1: i18.Account_verified_failed,
            text2: i18.Please_try_again,
            visibilityTime: 5000,
            text1Style: { fontSize: 18, fontWeight: 'normal', fontFamily: 'Athelas-Regular' },
            text2Style: { fontSize: 14, fontWeight: 'normal', fontFamily: 'Athelas-Regular' }
        });

    }

    const getStageButtonText = () => {
        if (currentStage === stages.length - 1) {
            return i18.Sign_up_exc;
        }
        if (currentStage === stages.length - 2) {
            return i18.Verify;
        }
        return i18.Next;
    }

    const getStageButtonAction = () => {
        if (currentStage === stages.length - 1) {
            return handleSubmit;
        }
        if (currentStage === stages.length - 2) {
            return handleVerify;
        }
        return handleNext;
    }

    return (
        
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.container, animatedStyle]}>
                    {stages.map((stage, index) => (
                        <View key={index} style={styles.stage}>
                            <Stage index={index} formData={formData} handleChange={handleChange} />
                            <Flex column>
                                <Button
                                    onPress={getStageButtonAction()}
                                    type='info'
                                    width={200}
                                    isLoading={submitButtonIsLoading}
                                >
                                    {getStageButtonText()}
                                </Button>
                                {currentStage > 0 ? (
                                    <>
                                        <VerticalSpacer spacing={16} />
                                        <Button onPress={handleBack} type='text-info'>
                                            {i18.Back}
                                        </Button>
                                    </>
                                ) : null}
                            </Flex>
                        </View>
                    ))}
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};
