import axios from "axios"
import { AppSettings } from "~/lib/appSettings";
import { AppUser } from "./types/appUser";
import { Feedback } from "./types/feedback";
import { getHeaders } from "~/lib/utils/apiUtils";

/**
 * Code to reach out to the /users api.
 */
export const usersApi = (() => {
    const baseUri = `${AppSettings.ApiUrl}/users`;

    const me = async (bearerToken: string): Promise<AppUser> => {
        return await axios.get(baseUri, getHeaders(bearerToken))
            .then(res => res.data);
    }

    const sync = async (user: AppUser, bearerToken: string): Promise<string> => {
        return await axios.post(baseUri, {
            user
        }, getHeaders(bearerToken))
        .then(res => res.data);
    }

    const saveFeedback = async (feedback: Feedback, bearerToken: string): Promise<string> => {
        return await axios.post(`${baseUri}/feedback`, {
            feedback
        }, getHeaders(bearerToken))
        .then(res => res.data);
    }

    const sendVerificationCode = async (username: string): Promise<string> => {
        return await axios.post(`${baseUri}/verification`, { username })
        .then(res => res.data);
    }

    const confirmVerificationCode = async (username: string, code: string): Promise<string> => {
        return await axios.post(`${baseUri}/verification/confirm`, { username, code })
        .then(res => res.data);
    }

    return {
        me,
        sync,
        saveFeedback,
        sendVerificationCode,
        confirmVerificationCode
    };
})();