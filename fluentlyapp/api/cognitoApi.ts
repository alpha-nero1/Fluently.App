import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    ISignUpResult,
    CognitoUserSession
} from 'amazon-cognito-identity-js';
import { UserPoolData } from '~/lib/constants/settings';
import { useAppLogger } from '~/lib/logging/AppLogger';

/**
 * Api for interacting with amazon cognito.
 */
export const cognitoApi = (() => {
    const logger = useAppLogger();
    const userPool = new CognitoUserPool(UserPoolData);

    // Sign Up Function.
    const signUp = (username: string, password: string): Promise<ISignUpResult> => {
        return new Promise((resolve, reject) => {
            userPool.signUp(username, password, [], [], (err, result) => {
                if (err) {
                    logger.error('Cognito signup error', err);
                    return reject(err);
                }

                logger.info('Signup success!', { username });
                return resolve(result!);
            });
        });
    };
  
    // Sign In Function
    const signIn = (username: string, password: string): Promise<string> => {
        const user = new CognitoUser({ Username: username, Pool: userPool });
        const authDetails = new AuthenticationDetails({ Username: username, Password: password });
    
        return new Promise((resolve, reject) => {
            user.authenticateUser(authDetails, {
                onSuccess: (session: CognitoUserSession) => {
                    const token = session.getIdToken().getJwtToken();
                    resolve(token);
                },
                onFailure: (err) => reject(err),
            });
        });
    };

    return {
        signIn,
        signUp
    }
})();