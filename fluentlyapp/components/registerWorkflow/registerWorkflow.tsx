import React, { useState } from 'react';
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useI18 } from '~/lib/hooks/useI18';
import { Language } from '~/lib/types/enums/Language';
import { TextField } from '../core/inputs/textField/textField';
import { Txt } from '../core/layout/txt/Txt';
import { Button } from '../core/inputs/button/button';
import { Dropdown } from '../core/inputs/dropdown/dropdown';
import { DialingCodeToISO, LearnerLanguages, LearningLanguages } from '~/lib/constants/language';
import { LanguageItem } from '~/app/main/account/account';
import { VerticalSpacer } from '../core/layout/verticalSpacer/verticalSpacer';
import { getDefaultLearnerLanguage, getDefaultLearningLanguage } from '~/lib/utils/languageUtils';
import { Flex } from '../core/layout/flex/flex';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import styleFunc from './registerWorkflow.styles';
import { useColouredStyles, useColours } from '~/lib/hooks/useColours';
import { cognitoApi } from '~/api/cognitoApi';
import Toast from 'react-native-toast-message';
import CountryFlag from 'react-native-country-flag';
import { extractDialCode } from '~/lib/utils/phoneUtils';
import { useNavigation } from '@react-navigation/native';
import { usersApi } from '~/api/usersApi';
import { showToast } from '~/lib/utils/toastUtils';

const { width } = Dimensions.get('screen');

interface IFieldValues {
    value?: any;
    valid?: boolean;
}

type IFormData = { [key in string]: IFieldValues };

export interface IRegisterData {
    email?: string
    phone?: string
    password: string;
    verficationCode: string;
    learningLanguage: Language;
    learnerLanguage: Language;
}

interface IRegisterWorkflowProps {
    onSubmit: (data: IRegisterData) => void;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const mobileRegex = /^\+?[1-9]\d{6,14}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface IStageProps {
    index: number;
    formData: IFormData;
    handleChange: (field: string, value: any, valid?: boolean) => void;
}

const Stage = ({ index, formData, handleChange }: IStageProps) => {
    const styles = useColouredStyles(styleFunc);
    const colours = useColours();
    const i18 = useI18();
    const [resendIsLoading, setResendIsLoading] = useState(false);

    const resendCodeOnPress = async () => {
        const { email, phone } = formData;
        if (!email.value && !phone.value) return;

        setResendIsLoading(true);
        const success = await usersApi.sendVerificationCode((email.value || phone.value) || '');
        setResendIsLoading(false);
        if (!success) {
            showToast('error', [i18.Sending_verification_code_failed]);
        }
    }

    const validatePassword = (text?: string) => {
        if (!text) return 'Required';
        if (!passwordRegex.test(text)) return 'Invalid password';
        return null;
    }

    const validatePhoneNumber = (text?: string) => {
        if (!text) return 'Required';
        if (!DialingCodeToISO.has(extractDialCode(text))) return 'Invalid country code';
        if (!mobileRegex.test(text)) return 'Invalid format';
        return null;
    }

    const validateEmail = (text?: string) => {
        if (!text && !formData.phone) return 'Required';
        if (!emailRegex.test(text || '')) return 'Invalid format';
        return null;
    }

    const stages = [
        <TouchableWithoutFeedback>
            <View key="email" style={styles.stageForm}>
                <Txt type='title'>{i18.Enter_your_email}</Txt>
                <TextField 
                    value={formData.email.value} 
                    valueOnChange={(value, valid) => handleChange('email', value, valid)} 
                    placeholder={i18.Email} 
                    autoCapitalize='none' 
                    validation={validateEmail}
                />
                <Txt type='subtitle'>{i18.OR}</Txt>
                <Txt type='title'>{i18.Phone_number}</Txt>
                <TextField
                    value={formData.phone.value} 
                    valueOnChange={(value, valid) => handleChange('phone', value, valid)} 
                    placeholder={i18.Phone_number_include_country_code} 
                    keyboardType='phone-pad'
                    validation={validatePhoneNumber}
                    prefix={(text) => {
                        if (!text || !DialingCodeToISO.has(extractDialCode(text))) return (
                            <View style={{ backgroundColor: colours.Grey, width: 32, height: 20 }}/>
                        );
                        return (
                            <CountryFlag isoCode={DialingCodeToISO.get(extractDialCode(text)) || 'UN'} size={20} />
                        );
                    }}
                />
            </View>
        </TouchableWithoutFeedback>,
        <TouchableWithoutFeedback>
            <View key="password" style={styles.stageForm}>
                <Txt type='title'>{i18.Enter_your_password}</Txt>
                <TextField 
                    value={formData.password.value} 
                    valueOnChange={(value, valid) => handleChange('password', value, valid)} 
                    placeholder={i18.Password} 
                    secureTextEntry
                    validation={validatePassword}
                />
            </View>
        </TouchableWithoutFeedback>,
        <TouchableWithoutFeedback>
            <View key="verificationCode" style={styles.stageForm}>
                <Txt type='title'>{i18.render(i18.Confirm_the_code_sent_to_0, (formData.email.value || formData.phone.value) || '')}</Txt>
                <TextField value={formData.verificationCode.value} valueOnChange={(value, valid) => handleChange('verificationCode', value, valid)} placeholder={i18.Verification_code} />
                <Button type='text-info' onPress={resendCodeOnPress} isLoading={resendIsLoading}>{i18.Resend_code}</Button>
            </View>
        </TouchableWithoutFeedback>,
        <TouchableWithoutFeedback>
            <View key="languages" style={styles.stageForm}>
                <Txt type='title'>{i18.You_speak}</Txt>
                <Dropdown<Language> selected={formData.learnerLanguage.value} options={LearnerLanguages} display={LanguageItem} placeholder={i18.Select_a_langauge} onSelect={(lang) => lang && handleChange('learnerLanguage', lang)} />
                <VerticalSpacer spacing={16} />
                <Txt type='title'>{i18.You_are_learning}</Txt>
                <Dropdown<Language> selected={formData.learningLanguage.value} options={LearningLanguages} display={LanguageItem} placeholder={i18.Select_a_langauge} onSelect={(lang) => lang && handleChange('learningLanguage', lang)} />
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
    const [formData, setFormData] = useState<IFormData>({
        email: { value: '' },
        phone: { value: '' },
        password: { value: '' },
        learningLanguage: { value: getDefaultLearningLanguage() },
        learnerLanguage: { value: getDefaultLearnerLanguage() },
        verificationCode: { value: '' }
    });
    const navigation = useNavigation();

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
        navigation.goBack();
    };

    const nextIsValid = () => {
        if (currentStage === 0) {
            return formData.email.valid || formData.phone.valid;
        }
        if (currentStage === 1) {
            return formData.password.valid;
        }
        if (currentStage === 2) {
            return !!formData.verificationCode.value;
        }
        return formData.learnerLanguage.value !== Language.Unknown
            && formData.learningLanguage.value !== Language.Unknown;
    }

    const handleSubmit = () => {
        const _formData: any = {};
        Object.keys(formData).forEach(key => {
            _formData[key] = formData[key].value
        });
        onSubmit(_formData);
    }

    const handleChange = (field: string, value: any, valid: boolean = false) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: { value, valid }
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
        const { email, phone, verificationCode } = formData;
        setSubmitButtonIsLoading(true);
        const username = email.value || phone.value;
        try {
            await usersApi.confirmVerificationCode(username, verificationCode.value);
            setSubmitButtonIsLoading(false);
            showToast('success', [i18.Account_verified_exc]);
            return handleNext();
        } catch {
            setSubmitButtonIsLoading(false);
            showToast('error', [i18.Account_verified_failed, i18.Please_try_again]);
        }
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

    const handleSignup = () => {
        const username = formData.email.value || formData.phone.value;
        setSubmitButtonIsLoading(true);
        return cognitoApi.signUp(username, formData.password.value)
        .then(res => {
            setCurrentStage(currentStage + 1);
        })
        .finally(() => {
            setSubmitButtonIsLoading(false);
        });
    }

    const getStageButtonAction = () => {
        if (currentStage === 3) {
            return handleSubmit;
        }
        if (currentStage === 2) {
            return handleVerify;
        }
        if (currentStage === 1) {
            return handleSignup;
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
                                    disabled={!nextIsValid()}
                                    isLoading={submitButtonIsLoading}
                                >
                                    {getStageButtonText()}
                                </Button>
                                <VerticalSpacer spacing={16} />
                                <Button onPress={handleBack} type='text-info'>
                                    {i18.Back}
                                </Button>
                            </Flex>
                        </View>
                    ))}
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};
