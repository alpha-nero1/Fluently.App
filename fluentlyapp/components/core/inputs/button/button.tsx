import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useColouredStyles } from '~/lib/hooks/useColouredStyles';

import { styleFunc, typeStylesFunc, textStylesFunc } from './button.styles';

export type ButtonType = 'info' | 'special' | 'unknown' | 'secondary' | 'text-info';

interface IButtonProps {
    id?: string;
    type?: ButtonType;
    width?: number;
    height?: number;
    flex?: number;
    children: string;
    isLoading?: boolean;
    disabled?: boolean;
    onPress?: () => void;
}

/**
 *  Standard button component.
 */
export const Button = (props: IButtonProps) => {
    const { id, type = 'info', children, isLoading, disabled, onPress } = props;
    const styles = useColouredStyles(styleFunc);
    const typeStyles = useColouredStyles(typeStylesFunc);
    const _textStyles = useColouredStyles(textStylesFunc);
    
    const buttonStyles: ViewStyle = {
        ...styles.button,
        ...typeStyles[type],
        ...(disabled || isLoading ? styles.disabledButton : {}),
    };
    if (props.height) buttonStyles.height = props.height;
    if (props.width) buttonStyles.width = props.width;
    if (props.flex) buttonStyles.flex = props.flex;

    const textStyles: TextStyle = {
        ...styles.text,
        ..._textStyles[type],
        ...(disabled || isLoading ? styles.disabledText : {}),
    };

    return (
        <TouchableOpacity
            style={buttonStyles}
            disabled={disabled || isLoading}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {isLoading 
            ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator color="white" />
                </View>
            ) : (
                <Text style={textStyles}>{children}</Text>
            )}
        </TouchableOpacity>
    );
}
