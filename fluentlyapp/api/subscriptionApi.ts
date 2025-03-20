import axios from "axios"
import { AppSettings } from "~/lib/appSettings";
import { SubscriptionType } from "~/lib/types/enums/SubscriptionType";

/**
 * Code to reach out to the /subscription api.
 */
export const SubscriptionApi = (() => {
    const baseUri = `${AppSettings.ApiUrl}/subscription`;

    const subscribe = async (
        subscriptionType: SubscriptionType, 
        nonce: string
    ): Promise<boolean> => {
        return await axios.post(baseUri, {
          subscriptionType,
          nonce
        })
            .then(res => res.data);
    }

    return {
      subscribe
    };
})();