import axios from "axios"
import { AppSettings } from "~/lib/appSettings";
import { AppUser } from "./types/appUser";
import { Feedback } from "./types/feedback";

/**
 * Code to reach out to the /users api.
 */
export const UsersApi = (() => {
    const baseUri = `${AppSettings.ApiUrl}/users`;

    const me = async (bearerToken: string): Promise<AppUser> => {
        return await axios.get(baseUri, { headers: { Authorization: `Bearer ${bearerToken}` }})
            .then(res => res.data);
    }

    const sync = async (user: AppUser, bearerToken: string): Promise<string> => {
        return await axios.post(baseUri, {
            user
        }, { headers: { Authorization: `Bearer ${bearerToken}` }})
        .then(res => res.data);
    }

    const saveFeedback = async (feedback: Feedback, bearerToken: string): Promise<string> => {
        return await axios.post(`${baseUri}/feedback`, {
            feedback
        }, { headers: { Authorization: `Bearer ${bearerToken}` }})
        .then(res => res.data);
    }

    return {
        me,
        sync,
        saveFeedback
    };
})();