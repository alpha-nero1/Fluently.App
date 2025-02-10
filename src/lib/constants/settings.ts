import * as secrets from '~/secrets';

export const ThemeSetting = 'Theme';

export const UserPoolData = {
    UserPoolId: secrets.CognitoUserPoolId,
    IdentityPoolId: secrets.CognitoIdentityPoolId,
    ClientId: secrets.CognitoClientId
};

export const Aws = {
    Region: secrets.AwsRegion
};

export const GoogleWebClientId = 'blahblah'