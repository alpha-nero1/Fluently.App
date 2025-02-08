import { TextInput, TextInputProps } from "react-native";
import { useColouredStyles, useColours } from "~/lib/hooks/useColours";

import styleFunc from './textField.styles';

/**
 * Standard text field component.
 */
export const TextField = (props: TextInputProps) => {
    const styles = useColouredStyles(styleFunc);
    const colours = useColours();

    return (
        <TextInput
            {...props}
            style={styles.field}
            placeholderTextColor={colours.GreyLight}
        />
    );
}