import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageUtils = (() => {
    // Save a setting
    const set = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error saving data', error);
        }
    };
    
    // Retrieve a setting
    const get = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.error('Error retrieving data', error);
        }
        return null;
    };

    return { get, set }
})();


