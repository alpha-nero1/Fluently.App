import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { useColouredStyles } from "~/lib/hooks/useColours";

import styleFunc from './flipCard.styles';

interface IFlipCardProps {
    isFlipped: boolean;
    onFlip: (flipped: boolean) => any;
    height: number;
    width: number;
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
}

/**
 * Displays filppable card content.
 */
export const FlipCard = ({ frontContent, backContent, height, width, isFlipped, onFlip }: IFlipCardProps) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const styles = useColouredStyles(styleFunc);

    useEffect(() => {
        const toValue = isFlipped ? 180 : 0;
        const duration = !toValue ? 0 : 300
        Animated.timing(animatedValue, {
            toValue,
            duration,
            useNativeDriver: true
        }).start();
    }, [isFlipped]);

    const flipOnReport = () => {
        onFlip(!isFlipped);
    }

    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    const getBackCardStyles = () => {
        return [
            styles.card, 
            styles.backCard,
            { transform: [{ rotateY: backInterpolate }] },
            isFlipped ? { opacity: 1 } : { opacity: 0 }
        ];
    }

    return (
        <TouchableOpacity onPress={flipOnReport} activeOpacity={1} style={[styles.cardContainer, { height, width }]}>
            <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
                <View style={styles.cardFace}>{frontContent}</View>
            </Animated.View>
            <Animated.View style={getBackCardStyles()}>
                <View style={styles.cardFace}>{backContent}</View>
            </Animated.View>
        </TouchableOpacity>
    );
}


