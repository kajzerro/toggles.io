import { effects } from 'redux-saga';
import { createBrowserHistory } from 'history';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import * as actions from './auth-actions';
import * as sagas from './auth-sagas';

describe('watchSignIn', () => {
  it('sets watches for signIn and forwards arguments to it', () => {
    const args = {
      uuid: jest.fn(),
      cognito: jest.fn(),
      userPool: new CognitoUserPool({
        ClientId: '11ghhhfc6n95asn6onruanq0nv',
        UserPoolId: 'eu-central-1_VN23DjbT8'
      }),
      user: null as any,
      routerHistory: createBrowserHistory()
    };
    const gen = sagas.watchSignIn(args) as Iterator<any>;
    expect((gen.next() as any).value)
      .toEqual(effects.takeEvery(actions.AuthActionType.SIGN_IN as any, sagas.signIn, args as any));
    expect((gen.next() as any).done).toBe(true);
  });
});
