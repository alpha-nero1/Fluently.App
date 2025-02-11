import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    ISignUpResult,
    CognitoUserSession
} from 'amazon-cognito-identity-js';
import { Aws, GoogleWebClientId, UserPoolData } from '~/lib/constants/settings';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { CognitoIdentityCredentials } from 'aws-sdk';
import { CognitoIdentityProviderClient, ConfirmSignUpCommand, ResendConfirmationCodeCommand } from "@aws-sdk/client-cognito-identity-provider";
import { useAppLogger } from '~/lib/logging/AppLogger';

/**
 * Api for interacting with amazon cognito.
 */
export const cognitoApi = (() => {
    const logger = useAppLogger();
    // Initialize Google Sign-In
    // GoogleSignin.configure({
    //     webClientId: GoogleWebClientId
    // });
    const userPool = new CognitoUserPool(UserPoolData);

    const cognitoClient = new CognitoIdentityProviderClient({
        region: Aws.Region
    });

    // Sign Up Function.
    const signUp = (username: string, password: string): Promise<ISignUpResult> => {
        return new Promise((resolve, reject) => {
            userPool.signUp(username, password, [], null, (err, result) => {
                console.log('aa signup!', result)
                if (err) {
                    return reject(err);
                }

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

    const confirmSignUp = async (username: string, code: string): Promise<boolean> => {
        try {
            const command = new ConfirmSignUpCommand({
                ClientId: UserPoolData.ClientId,
                Username: username,
                ConfirmationCode: code,
            });
        
            await cognitoClient.send(command);
            return true;
        } catch (error: any) {
            logger.warning('Verification failed', error)
            return false;
        }
    }

    const resendConfirmationCode = async (username: string): Promise<boolean> => {
        try {
            const command = new ResendConfirmationCodeCommand({
                ClientId: UserPoolData.ClientId,
                Username: username,
            });
        
            await cognitoClient.send(command);
            return true;
        } catch (error: any) {
            logger.warning('Verification code resend failed', error.message)
            return false;
        }
    }

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
        // try {
        //     await GoogleSignin.hasPlayServices(); // Check for Google Play services
        //     const userInfo = await GoogleSignin.signIn(); // Sign in with Google
        //     const idToken = userInfo.data?.idToken; // Get the tokens
        
        //     return await authenticateGoogleWithCognito(idToken ?? '');
        // } catch (error: any) {
        //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //         console.log('User cancelled the login flow');
        //     } else if (error.code === statusCodes.IN_PROGRESS) {
        //         console.log('Sign-in in progress');
        //     } else {
        //         console.error(error);
        //     }
        // }
    };

    return {
        signIn,
        signUp,
        confirmSignUp,
        resendConfirmationCode,
        signInWithGoogle
    }
})();