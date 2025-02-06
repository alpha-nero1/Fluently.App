import React from 'react'
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet, Pressable } from 'react-native';
import { Colours } from '~/lib/themes/colours';

interface IPageViewProps {
    style: any;
    children: any;
    disableDefaultPadding?: boolean;
}

/**
 * Standard page view component.
 */
export const PageView = ({ children, disableDefaultPadding, style }: IPageViewProps) => {
    const styles = [
        styleSheet.container,
        {
            padding: disableDefaultPadding ? 0 : 16,
            backgroundColor: Colours.Light
        },
        style
    ]
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
        flex: 1
    }
})