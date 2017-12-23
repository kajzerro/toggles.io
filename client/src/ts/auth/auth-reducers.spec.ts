import * as authActions from './auth-actions';

import { signIn, SignInState } from './auth-reducers';

describe('signIn', () => {
  it('sets signInState to PENDING, nullify others', () => {
    expect(signIn({} as any, authActions.signIn({ username: 'bob', password: 'secret' })))
      .toEqual({ signInState: SignInState.PENDING, signInErrorMessage: null, user: null });
  });
});
