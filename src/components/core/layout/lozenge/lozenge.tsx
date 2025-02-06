import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colours } from "~/lib/themes/colours";

// Define possible status types
export type LozengeStatus = "success" | "warning" | "error" | "info" | "special" | "unknown";

interface ILozengeProps {
  status: LozengeStatus;
  children: string;
  style?: object; // For optional additional styling
}

export const Lozenge = ({ status, children, style }: ILozengeProps) => {
    return (
        <View style={[styles.lozenge, styles[status], style]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: Colours.GreenLight, 
        color: Colours.Green, 
    },
    unknown: {
        backgroundColor: Colours.GreyLight, 
        color: Colours.Grey, 
    },
    warning: {
        backgroundColor: Colours.OrangeLight, 
        color: Colours.Orange, 
    },
    error: {
        backgroundColor: Colours.RedLight, 
        color: Colours.Red, 
    },
    info: {
        backgroundColor: Colours.BlueLight, 
        color: Colours.Blue, 
    },
    special: {
        backgroundColor: Colours.PurpleLight, 
        color: Colours.Purple, 
    },
});
