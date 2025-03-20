import { useEffect } from "react";
import { useStores } from "../state/storeProvider";
import { usersApi } from "~/api/usersApi";

/**
 * Code responsible for initialising the app.
 */
export const useAppStartup = () => {
    const { settingStore } = useStores();

    useEffect(() => {
        usersApi.me(settingStore.accessToken)
            .then(res => {
                settingStore.setLearnerLanguage(res.learnerLanguage);
                settingStore.setLearningLanguage(res.learningLanguage);
            });
    }, []);
}