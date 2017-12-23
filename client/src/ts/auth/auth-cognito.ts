import { CognitoUserSession, CognitoUserAttribute, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { User } from './auth-reducers';

export interface SignInResult { user: CognitoUser; userData: User; }

export const signIn = (cognito: any, userPool: CognitoUserPool,
                       username: string, password: string): Promise<SignInResult> => {
  const { AuthenticationDetails } = cognito;
  const CognitoUserCtor = cognito.CognitoUser;
  const authDetails = new AuthenticationDetails({ Username: username, Password: password });
  const user = new CognitoUserCtor({ Username: username, Pool: userPool });
  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (session: CognitoUserSession, userConfirmationNecessary?: boolean) => {
        user.getUserAttributes((err: any, userAttributes: [CognitoUserAttribute]) => {
          if (err) {
            reject(err);
          } else {
            const attrs: {[key: string]: string} = {};
            userAttributes.forEach((r: CognitoUserAttribute) => attrs[r.getName()] = r.getValue());
            resolve({
              user,
              userData: {
                username,
                email: attrs.email,
                fullName: attrs.name,
                passwordSetRequired: false
              }
            });
          }
        });
      },
      onFailure: (error: any) => {
        reject(error);
      },
      newPasswordRequired: (userAttributes: {[key: string]: string}, requiredAttributes: {[key: string]: string}) => {
        resolve({
          user,
          userData: {
            username,
            session: null,
            email: userAttributes.email,
            fullName: userAttributes.name,
            passwordSetRequired: true
          }
        });
      }
    });
  });
};

export const changePassword = (cognito: any, user: CognitoUser, password: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    user.completeNewPasswordChallenge(password, [], {
      onSuccess: (session: CognitoUserSession) => {
        resolve(null);
      },
      onFailure: (error: any) => {
        reject(error);
      }
    });
  });
};

export const logOut = (user: CognitoUser, fromAllDevices: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (fromAllDevices) {
      user.globalSignOut({
        onSuccess: (message: string) => resolve(message),
        onFailure: (error: any) => reject(error)
      });
    } else {
      user.signOut();
      resolve('');
    }
  });
};
