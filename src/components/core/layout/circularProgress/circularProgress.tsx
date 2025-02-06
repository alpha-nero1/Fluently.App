import React, { useRef, useEffect } from 'react';
import { Constants } from '~/lib/constants';
import Svg, { Circle, Text } from 'react-native-svg';
import { Animated } from 'react-native';

export type ProgressSize = 'largest' | 'large' | 'medium' | 'small' | 'smallest';
export type ProgressStatus = 'success' | 'warning' | 'error' | 'info' | 'special' | 'unknown';

interface ICircularProgressProps {
    size?: ProgressSize;
    progress?: number;
    status?: ProgressStatus;
}

export const statusColourRegister = {
    success: Constants.Colours.Success,
    warning: Constants.Colours.Warning,
    error: Constants.Colours.Error,
    info: Constants.Colours.Info,
    special: Constants.Colours.Special,
    unknown: Constants.Colours.Unknown,
};

export const statusLightColourRegister = {
    success: Constants.Colours.SuccessLight,
    warning: Constants.Colours.WarningLight,
    error: Constants.Colours.ErrorLight,
    info: Constants.Colours.InfoLight,
    special: Constants.Colours.SpecialLight,
    unknown: Constants.Colours.UnknownLight,
};

const sizeRegister = {
    largest: 200,
    large: 100,
    medium: 60,
    small: 40,
    smallest: 25,
};

const fontSizeRegister = {
    largest: 18,
    large: 16,
    medium: 14,
    small: 10,
    smallest: 8,
};

/**
 * A component for displaying a circular progress.
 */
export const CircularProgress = (props: ICircularProgressProps) => {
    const size = props.size || 'medium';
    const realSize = sizeRegister[size];
    const strokeWidth = realSize / 10;
    const progress = props.progress || 0;
    const status = props.status || 'unknown';

    const radius = (realSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const colour = statusColourRegister[status];
    const colourLight = statusLightColourRegister[status];

    // Create an Animated Value for strokeDashoffset
    const animatedOffset = useRef(new Animated.Value(offset)).current;

    useEffect(() => {
        Animated.timing(animatedOffset, {
            toValue: offset,
            duration: 350, // Adjust the duration for the animation
            useNativeDriver: false, // We can't use native driver here since it's a custom SVG property
        }).start();
    }, [offset]);

    // Wrap the Circle component with Animated.createAnimatedComponent
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    return (
        <Svg width={realSize} height={realSize} viewBox={`0 0 ${realSize} ${realSize}`}>
            {/* Track */}
            <Circle
                cx={realSize / 2}
                cy={realSize / 2}
                r={radius}
                stroke={colourLight}
                strokeWidth={strokeWidth}
                fill="none"
            />

            {/* Progress Circle with Animated strokeDashoffset */}
            <AnimatedCircle
                cx={realSize / 2}
                cy={realSize / 2}
                r={radius}
                stroke={colour}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={animatedOffset}  // Use the animated value
                strokeLinecap="round"
                transform={`rotate(-90 ${realSize / 2} ${realSize / 2})`}
            />

            {/* Percentage Text */}
            <Text
                x="40%"
                y="52%"
                dy=".3em"
                textAnchor="middle"
                fontSize={fontSizeRegister[size]}
                fill={colour}
            >
                {Math.round(progress)}%
            </Text>
        </Svg>
    );
}
