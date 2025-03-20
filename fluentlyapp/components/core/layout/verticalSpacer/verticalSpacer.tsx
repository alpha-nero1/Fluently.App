import { View, StyleSheet } from "react-native";

interface Props {
    spacing: number;
}

/**
 * Reusable core spacing component. Use for convenience
 * for spacing / reduce need for styles.
 */
export function VerticalSpacer(props: Props) {
    const style = StyleSheet.create({
        spacer: { height: props.spacing }
    });

    return (
      <View style={style.spacer} />
    );
}
