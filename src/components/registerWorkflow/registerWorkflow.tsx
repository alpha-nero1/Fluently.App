import React, { useState } from 'react';
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useI18 } from '~/lib/hooks/useI18';
import { Language } from '~/lib/types/enums/Language';
import { TextField } from '../core/inputs/textField/textField';
import { Txt } from '../core/layout/txt/Txt';
import { Button } from '../core/inputs/button/button';
import { Dropdown } from '../core/inputs/dropdown/dropdown';
import { Languages } from '~/lib/constants/language';
import { LanguageItem } from '~/app/main/account';
import { VerticalSpacer } from '../core/layout/verticalSpacer/verticalSpacer';
import { getDefaultLearnerLanguage, getDefaultLearningLanguage } from '~/lib/utils/languageUtils';
import { Flex } from '../core/layout/flex/flex';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import styleFunc from './registerWorkflow.styles';
import { useColouredStyles } from '~/lib/hooks/useColours';

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

const Stage = ({ index, formData, handleChange }: any) => {
    const styles = useColouredStyles(styleFunc);
    const i18 = useI18();

    const stages = [
        <TouchableWithoutFeedback>
            <View key="email" style={styles.stageForm}>
                <Txt type='title'>{i18.Enter_your_email}</Txt>
                <TextField value={formData.email} onChangeText={value => handleChange('email', value)} placeholder={i18.Email} autoCapitalize='none' />
                <Txt type='subtitle'>{i18.OR}</Txt>
                <Txt type='title'>{i18.Phone_number}</Txt>
                <TextField value={formData.phone} onChangeText={value => handleChange('phone', value)} placeholder={i18.Phone_number} keyboardType='number-pad' />
            </View>
        </TouchableWithoutFeedback>,
        <TouchableWithoutFeedback>
            <View key="password" style={styles.stageForm}>
                <Txt type='title'>{i18.Enter_your_password}</Txt>
                <TextField value={formData.password} onChangeText={value => handleChange('password', value)} placeholder={i18.Password} secureTextEntry />
            </View>
        </TouchableWithoutFeedback>,
        <TouchableWithoutFeedback>
            <View key="languages" style={styles.stageForm}>
                <Txt type='title'>{i18.You_speak}</Txt>
                <Dropdown<Language> selected={formData.learnerLanguage} options={Languages} display={LanguageItem} placeholder={i18.Select_a_langauge} onSelect={(lang) => lang && handleChange('learnerLanguage', lang)} />
                <VerticalSpacer spacing={16} />
                <Txt type='title'>{i18.You_are_learning}</Txt>
                <Dropdown<Language> selected={formData.learningLanguage} options={Languages} display={LanguageItem} placeholder={i18.Select_a_langauge} onSelect={(lang) => lang && handleChange('learningLanguage', lang)} />
            </View>
        </TouchableWithoutFeedback>
    ]

    return stages[index];
}

export const RegisterWorkflow = ({ onSubmit }: IRegisterWorkflowProps) => {
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

    return (
        
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.container, animatedStyle]}>
                    {stages.map((stage, index) => (
                        <View key={index} style={styles.stage}>
                            <Stage index={index} formData={formData} handleChange={handleChange} />
                            <Flex column>
                                <Button
                                    onPress={currentStage === stages.length - 1 ? handleSubmit : handleNext}
                                    type='info'
                                    width={200}
                                >
                                    {currentStage === stages.length - 1 ? i18.Sign_up_exc : i18.Next}
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
