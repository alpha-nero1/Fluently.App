import { useState } from 'react';
import { Pressable } from "react-native";
import { Language } from "~/lib/types/enums/Language";
import { LanguageSpeakMap } from '~/lib/constants/language';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Choose any icon set
import { useColours } from '~/lib/hooks/useColours';
import Tts from 'react-native-tts';

interface ISpeakIconProps {
    text: string;
    language: Language
}

/**
 * Standard and re-usable speaking icon.
 */
export const SpeakIcon = ({ text, language }: ISpeakIconProps) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const colours = useColours();

    const speakOnPress = () => {
        setIsSpeaking(true);

        const langCode = LanguageSpeakMap[language];
        Tts.setDefaultLanguage(langCode);
        Tts.speak(text);
        setTimeout(() => {
            setIsSpeaking(false);
        }, 1000);
    }

    const speakColour = isSpeaking
        ? colours.Grey
        : colours.Text;
    
    return (
        <Pressable onPress={speakOnPress}>
            <Icon name="volume-up" size={40} color={speakColour} style={{ paddingLeft: 8, flexShrink: 0 }} />
        </Pressable>
    );
}