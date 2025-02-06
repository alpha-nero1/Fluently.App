import { TextInput, TextInputProps } from "react-native";

import styles from './textField.styles';
import { Colours } from "~/lib/themes/colours";

/**
 * Standard text field component.
 */
export const TextField = (props: TextInputProps) => {
    return (
        <TextInput
            {...props}
            style={styles.field}
            placeholderTextColor={Colours.GreyLight}
        />
    );
}