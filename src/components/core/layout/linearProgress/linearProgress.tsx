import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';
import { Colours } from '~/lib/themes/colours';

const { width: screenWidth } = Dimensions.get('window');

interface LinearProgressProps {
    progress: number; // Value between 0 and 1
    height?: number;
    width?: number;
    color?: string;
    backgroundColor?: string;
    animationDuration?: number;
}

export const LinearProgress = ({
    progress,
    height = 6,
    width = screenWidth,
    color = Colours.BlueLight,
    backgroundColor = Colours.GreyLight,
    animationDuration = 300,
    }: LinearProgressProps) => {

    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: progress * 100, // Convert progress (0-1) to percentage
            duration: animationDuration,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    return (
        <View style={[styles.container, { height, backgroundColor, width }]}>
            <Animated.View
                style={[styles.progressBar, { width: animatedWidth.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }), 
                  backgroundColor: color,
                  height: height
                }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    progressBar: {
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3
    }
});
