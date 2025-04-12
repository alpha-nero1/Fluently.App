import { useMemo, useState } from 'react';
import { TextInput, TextInputProps, View } from "react-native";
import { useColouredStyles } from "~/lib/hooks/useColouredStyles";
import { useColours } from "~/lib/hooks/useColours";
import { Txt } from '../../layout/txt/Txt';
import { Flex } from '../../layout/flex/flex';

import styleFunc from './textField.styles';

export type ITextFieldProps = TextInputProps & {
    valueOnChange?: (text?: string, valid?: boolean) => any;
    
    /**
     * Configure a prefix component for the field.
     */
    prefix?: (text?: string) => any;

    /**
     * Configure validation for the field.
     */
    validation?: (text?: string) => string | null;
}

/**
 * Standard text field component.
 */
export const TextField = (props: ITextFieldProps) => {
    const styles = useColouredStyles(styleFunc);
    const colours = useColours();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const textFieldStyles = useMemo(() => {
        const _styles: any[] = [styles.field];

        if (isFocused) _styles.push(styles.focused);

        if (props.validation && isTouched) {
            if (errorMessage) _styles.push(styles.error);
            else _styles.push(styles.valid);
        }

        if (props.style) _styles.push(props.style);

        return _styles;
    }, [props.validation, isTouched, isFocused, errorMessage]);

    const captionStyle = () => {
        if (!props.validation || !isTouched) return {};
        if (errorMessage) return styles.captionError;
        return styles.captionValid;
    }

    const onChangeText = (text: string) => {
        const validation = props.validation ? props.validation(text) : null;
        if (isTouched) {
            setErrorMessage(validation);
        }
        if (props.onChangeText) props.onChangeText(text);
        if (props.valueOnChange) props.valueOnChange(text, !validation);
    }

    return (
        <View>
            <Flex alignCenter>
                {
                    props.prefix ? (
                        <View style={{ marginRight: 8, marginBottom: 8 }}>
                            {props.prefix(props.value)}
                        </View>
                    ): null
                }
                <TextInput
                    {...props}
                    style={textFieldStyles}
                    placeholderTextColor={colours.GreyLight}
                    onChangeText={onChangeText}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsTouched(true);
                        setIsFocused(false);
                    }}
                />
            </Flex>
            {
                errorMessage
                ? <Txt type='caption' style={captionStyle()}>{errorMessage}</Txt>
                : null
            }
        </View>
    );
}