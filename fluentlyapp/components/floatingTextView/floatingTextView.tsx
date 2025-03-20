import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";
import { Txt } from "../core/layout/txt/Txt";

import styles from './floatingTextView.styles';

const { width, height } = Dimensions.get("window");

/**
 * Text that floats from left to right.
 */
const FloatingText = ({ text, delay, speed, startY }: any) => {
    const translateX = useRef(new Animated.Value(-100)).current; // Start just off-screen left

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
              toValue: width + 100, // Move to just off-screen right
              duration: speed,
              delay: delay,
              useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.textWrapper, { top: startY, transform: [{ translateX }] }]}>
            <Txt type='title' bold italic>{text}</Txt>
        </Animated.View>
    );
};

interface IFloatingTextViewProps {
    words: string[];
}

/**
 * 
 * @param param
 * @returns 
 */
export const FloatingTextView = ({ words }: IFloatingTextViewProps) => {
    return (
        <View style={styles.container}>
            {words.map((word, index) => (
                <FloatingText
                  key={index}
                  text={word}
                  delay={index * 700} // Different start times
                  speed={8000 + Math.random() * 5000} // Different speeds
                  startY={((index * 40) % height) + 40} // Different Y positions
                />
            ))}
        </View>
    );
};
