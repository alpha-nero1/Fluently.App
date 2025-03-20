import { Dropin, Options } from "braintree-web-drop-in";
import { SubscriptionType } from "../types/enums/SubscriptionType";

declare const braintree: any;

export const paymentContainerId = 'dropin-container';
export const paymentSubmitButton = 'submit-button';

/**
 *  Create an instance of braintree. 
 */
export const createBraintreeInstance = (): Promise<Dropin> => {
    return new Promise((resolve, reject) => {
        const button = document.getElementById(paymentSubmitButton);
        // NOTE: review this when proper logging in place.
        if (!button) {
            console.error('Braintree instance has no button to attach to');
            return reject('Braintree instance has no button to attach to')
        }

        const options: Options = {
            authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
            container: `#${paymentContainerId}`,
            card: {
                cardholderName: {
                    required: true
                },
                overrides: {
                    fields: {
                        number: {
                            placeholder: '4111 1111 1111 1111'
                        }
                    }
                }
            }
        };

        braintree.dropin.create(options, (err: any, instance: any) => {
            if (err) {
                console.error('Braintree instance setup error', err);
                return reject(err);
            }
            return resolve(instance);
        })
    });
}

export const getFeeFromSubscriptionType = (subscriptionType: SubscriptionType) => {
    switch (subscriptionType) {
        case SubscriptionType.Lifetime: return '79.99';
        case SubscriptionType.Yearly: return '35.99';
        case SubscriptionType.Monthly: return '3.99';
        case SubscriptionType.Unknown: throw new Error('Invalid subscription type')
    }
}