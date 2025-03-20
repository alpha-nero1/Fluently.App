import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { useColours } from '~/lib/hooks/useColours';

interface IPageViewProps {
    style?: any;
    children: any;
    disableDefaultPadding?: boolean;
    applyOffsetBottomPadding?: boolean;
}

/**
 * Standard page view component.
 */
export const PageView = ({ children, disableDefaultPadding, applyOffsetBottomPadding, style }: IPageViewProps) => {
    const navigation = useNavigation();
    const colours = useColours();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    
    const styles = [
        styleSheet.container,
        {
            paddingTop: 60,
            paddingBottom: applyOffsetBottomPadding ? 60 : 0,
            padding: disableDefaultPadding ? 0 : 16,
            backgroundColor: colours.Background
        },
        style
    ];

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={styles}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    }
})