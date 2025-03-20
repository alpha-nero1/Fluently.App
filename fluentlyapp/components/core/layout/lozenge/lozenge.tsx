import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColouredStyles } from "~/lib/hooks/useColours";
import { IColours } from "~/lib/themes/colours";

// Define possible status types
export type LozengeStatus = "success" | "warning" | "error" | "info" | "special" | "unknown";

interface ILozengeProps {
  status: LozengeStatus;
  children: string;
  style?: object; // For optional additional styling
}

export const Lozenge = ({ status, children, style }: ILozengeProps) => {
    const styles = useColouredStyles(styleFunc);
    const stl = [styles.lozenge, styles[status], style];
    const textStl = [styles.text, styles[status]];
    return (
        <View style={stl}>
            <Text style={textStl}>{children}</Text>
        </View>
    );
}

const styleFunc = (colours: IColours) => StyleSheet.create({
    lozenge: {
        borderRadius: 8, // Equivalent to .4rem
        paddingVertical: 4,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    success: {
        backgroundColor: colours.Green, 
        color: colours.TextSuccess, 
    },
    unknown: {
        backgroundColor: colours.GreyLight, 
        color: colours.TextUnknown, 
    },
    warning: {
        backgroundColor: colours.Orange, 
        color: colours.TextWarning, 
    },
    error: {
        backgroundColor: colours.Red, 
        color: colours.TextError, 
    },
    info: {
        backgroundColor: colours.BlueLight, 
        color: colours.TextInfo, 
    },
    special: {
        backgroundColor: colours.Purple, 
        color: colours.TextSpecial, 
    },
});
