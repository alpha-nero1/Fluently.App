import Toast, { ToastType } from "react-native-toast-message";

/**
 * Makes use of Toast.show clean & concise.
 */
export const showToast = (type: ToastType, text: string[], duration: number = 3000) => {
    const textOne = text.length > 0 ? text[0] : undefined;
    const textTwo = text.length > 1 ? text[1] : undefined;
    Toast.show({
        type,
        text1: textOne,
        text2: textTwo,
        visibilityTime: duration,
        text1Style: { fontSize: 18, fontWeight: 'normal', fontFamily: 'Athelas-Regular' },
        text2Style: { fontSize: 14, fontWeight: 'normal', fontFamily: 'Athelas-Regular' }
    });
}