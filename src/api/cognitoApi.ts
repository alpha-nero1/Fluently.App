import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    ISignUpResult,
    CognitoUserSession
} from 'amazon-cognito-identity-js';
import { GoogleWebClientId, UserPoolData } from '~/lib/constants/settings';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { CognitoIdentityCredentials } from 'aws-sdk';

/**
 * Api for interacting with amazon cognito.
 */
export const cognitoApi = (() => {
    // Initialize Google Sign-In
    GoogleSignin.configure({
        webClientId: GoogleWebClientId
    });
    const userPool = new CognitoUserPool(UserPoolData);

    // Sign Up Function.
    const signUp = (email: string, password: string): Promise<ISignUpResult> => {
        return new Promise((resolve, reject) => {
            userPool.signUp(email, password, [], null, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result!);
            });
        });
    };
  
    // Sign In Function
    const signIn = (email: string, password: string): Promise<string> => {
        const user = new CognitoUser({ Username: email, Pool: userPool });
        const authDetails = new AuthenticationDetails({ Username: email, Password: password });
    
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

    const authenticateGoogleWithCognito = (googleIdToken: string) => {
        const cognitoIdentity = new CognitoIdentityCredentials({
            IdentityPoolId: UserPoolData.IdentityPoolId,  // From Cognito Identity Pool
            Logins: {
                'accounts.google.com': googleIdToken,  // 'accounts.google.com' is the provider for Google
            },
        });
        
        return new Promise((resolve, reject) => {
            // Get credentials from Cognito
            cognitoIdentity.get((err) => {
                if (err) {
                    console.error('Cognito Authentication Failed', err);
                    return reject(err);
                } else {
                    return resolve(cognitoIdentity);
                }
            });
        });
    };

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices(); // Check for Google Play services
            const userInfo = await GoogleSignin.signIn(); // Sign in with Google
            const idToken = userInfo.data?.idToken; // Get the tokens
        
            return await authenticateGoogleWithCognito(idToken ?? '');
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign-in in progress');
            } else {
                console.error(error);
            }
        }
    };

    return {
        signIn,
        signUp,
        signInWithGoogle
    }
})();