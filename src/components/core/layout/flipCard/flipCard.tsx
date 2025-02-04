import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";

import styles from './flipCard.styles';

interface IFlipCardProps {
    height: number;
    width: number;
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
}

/**
 * Displays filppable card content.
 */
export const FlipCard = ({ frontContent, backContent, height, width }: IFlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const flipCard = () => {
        Animated.timing(animatedValue, {
            toValue: isFlipped ? 0 : 180,
            duration: 300,
            useNativeDriver: true
        }).start();
        setIsFlipped(!isFlipped);
    };

    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    return (
        <TouchableOpacity onPress={flipCard} activeOpacity={1} style={[styles.cardContainer, { height, width }]}>
            <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
                <View style={styles.cardFace}>{frontContent}</View>
            </Animated.View>
            <Animated.View style={[styles.card, styles.backCard, { transform: [{ rotateY: backInterpolate }] }]}>
                <View style={styles.cardFace}>{backContent}</View>
            </Animated.View>
        </TouchableOpacity>
    );
}


