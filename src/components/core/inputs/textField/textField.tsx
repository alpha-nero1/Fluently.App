import { TextInput, TextInputProps } from "react-native";
import { useColouredStyles, useColours } from "~/lib/hooks/useColours";

import styleFunc from './textField.styles';

/**
 * Standard text field component.
 */
export const TextField = (props: TextInputProps) => {
    const styles = useColouredStyles(styleFunc);
    const colours = useColours();

    const style = {
        ...styles.field,
        ...(props.style || {} as any)
    }

    return (
        <TextInput
            {...props}
            style={style}
            placeholderTextColor={colours.GreyLight}
        />
    );
}