import * as React from 'react';
import * as Radium from 'radium';
import { connect } from 'react-redux';
import { State } from '../../common/index';
import * as authActions from '../auth-actions';
import { SignInState } from '../auth-reducers';
import * as styles from './LoginPageStyles';
import LoginForm, { LoginFormData } from './components/LoginForm';

export interface LoginPageStatePops { signInIsLoading: boolean; signInError: string; }

export interface LoginPageDispatchProps { onLogin: (data: LoginFormData) => void; }

export type LoginPageProps = LoginPageDispatchProps & LoginPageStatePops;

export const LoginPage = ({ onLogin, signInIsLoading, signInError }: LoginPageProps) => {
  const errors = {
    username: null as string,
    password: null as string,
    __all: signInError
  };

  return (
    <div style={[styles.common]}>
      <LoginForm onSubmit={onLogin} isLoading={signInIsLoading} errors={errors} />
    </div>
  );
};

export default connect<LoginPageStatePops, LoginPageDispatchProps, {}, State>(
  (state) => ({
    signInIsLoading: state.auth.signInState === SignInState.PENDING,
    signInError: state.auth.signInErrorMessage
  }),
  (dispatch, ownProps) => ({
    onLogin: (data) => dispatch(authActions.signIn(data))
  })
)(Radium(LoginPage));
