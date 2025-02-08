import { Stack } from "expo-router";

export default () => {
    return (
        <Stack>
            <Stack.Screen name="revise" options={{ headerShown: false }} />
            <Stack.Screen name="revise/reviseSet/reviseSet" options={{ headerShown: false }} />
        </Stack>
    );
}
