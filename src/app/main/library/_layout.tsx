import { Stack } from "expo-router";

export default () => {
    return (
        <Stack>
            <Stack.Screen name="library" options={{ headerShown: false }} />
            <Stack.Screen name="library/content/content" options={{ headerShown: false }} />
        </Stack>
    );
}
